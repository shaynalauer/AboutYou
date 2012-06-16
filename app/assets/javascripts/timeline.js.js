var Timeline, testData;

window.Timeline = Timeline = (function() {

  function Timeline(data) {
    var box, kudo, kudos, _i, _j, _len, _len2, _ref, _ref2,
      _this = this;
    console.log(data);
    _ref = data.employers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      kudo = _ref[_i];
      kudo.type = 'work';
    }
    _ref2 = data.education;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      kudo = _ref2[_j];
      kudo.type = 'education';
    }
    kudos = data.work.concat(data.education);
    box = $('<div class="box padfront"></div>');
    this.wrap = $('<div id="timeline"></div>');
    this.boxHash = kudos.map(function(kudo) {
      return _this.decorateBoxNode(box.clone(), kudo);
    });
  }

  Timeline.prototype.decorateBoxNode = function(node, kudo) {
    var html, maxHeight;
    html = [];
    if (kudo.type === 'work') {
      html.push("<img class='icon' src='http://static.ak.fbcdn.net/rsrc.php/v2/yE/r/4U1vSOqKlpj.png' />");
      if (!kudo.end_date) {
        html.push("<h1>Working at " + kudo.employer.name + "</h1>");
      }
      if (kudo.end_date) {
        html.push("<h1>Worked at " + kudo.employer.name + "</h1>");
      }
      if (kudo.start_date) {
        html.push("<h2>" + kudo.start_date + " - " + kudo.position.name + "</h2>");
      }
      html.push("<h2 class='bottom'>" + kudo.location.name + "</h2>");
    } else if (kudo.type === 'education') {
      html.push("<div class='cap icon'></div>");
      html.push("<h1>Graduated from " + kudo.school.name + "</h1>");
      if (kudo.year) html.push("<h2 class='bottom'>" + kudo.year.name + "</h2>");
    }
    $('body').prepend(this.wrap);
    node.append(html.join(''));
    node.appendTo(this.wrap);
    maxHeight = node.outerHeight(true);
    console.log(maxHeight);
    node.remove();
    node.height(40);
    this.wrap.remove();
    this.giveJSGoodies(node, maxHeight);
    return {
      year: this.getYear(kudo),
      node: node
    };
  };

  Timeline.prototype.getYear = function(kudo) {
    var date, _ref;
    date = kudo.start_date || ((_ref = kudo.year) != null ? _ref.name : void 0);
    return (date != null ? date.split('-')[0] : void 0) || 0;
  };

  Timeline.prototype.dumpNodesTo = function(container) {
    var box, lastYear, sorted, _i, _len, _results;
    container.prepend(this.wrap);
    sorted = this.boxHash.sort(function(item1, item2) {
      return item1.year < item2.year;
    });
    lastYear = sorted[0].year;
    _results = [];
    for (_i = 0, _len = sorted.length; _i < _len; _i++) {
      box = sorted[_i];
      if (box.year && box.year !== lastYear) {
        this.wrap.append($("<div class='date'>" + box.year + "</div>"));
        lastYear = box.year;
      }
      _results.push(this.wrap.append(box.node));
    }
    return _results;
  };

  Timeline.prototype.giveJSGoodies = function(node, maxHeight) {
    node.mouseenter(function() {
      node.css({
        'border-color': '#333',
        'height': maxHeight
      });
      return node.find('.icon').css({
        'margin-top': '20px'
      });
    });
    return node.mouseleave(function() {
      node.css({
        'border-color': '#dfdfdf',
        'height': '40px'
      });
      return node.find('.icon').css({
        'margin-top': '4px'
      });
    });
  };

  return Timeline;

})();

testData = {
  'work': [
    {
      'employer': {
        'id': '121841901176802',
        'name': 'Xtreme Labs'
      },
      'location': {
        'id': '110941395597405',
        'name': 'Toronto, Ontario'
      },
      'position': {
        'id': '144609565576376',
        'name': 'Agile Engineer'
      },
      'start_date': '2012-05',
      'end_date': '2012-09'
    }, {
      'employer': {
        'id': '152361548143668',
        'name': 'Bookneto'
      },
      'location': {
        'id': '104045032964460',
        'name': 'Kitchener, Ontario'
      },
      'position': {
        'id': '109542932398298',
        'name': 'Software Engineer'
      },
      'start_date': '2011-09',
      'end_date': '2012-01'
    }, {
      'employer': {
        'id': '107146985986320',
        'name': 'Nav Canada'
      },
      'location': {
        'id': '109870912368806',
        'name': 'Ottawa, Ontario'
      },
      'position': {
        'id': '139901252703261',
        'name': 'System Software Developer'
      },
      'start_date': '2011-01',
      'end_date': '2011-04'
    }
  ],
  'education': [
    {
      'school': {
        'id': '108006165887469',
        'name': 'E.L. Crossley Secondary School'
      },
      'type': 'High School'
    }, {
      'school': {
        'id': '103773232995164',
        'name': 'University of Waterloo'
      },
      'year': {
        'id': '143641425651920',
        'name': '2014'
      },
      'concentration': [
        {
          'id': '104076956295773',
          'name': 'Computer Science'
        }
      ],
      'type': 'College'
    }
  ]
};

window.timeline = new Timeline(window.data);

timeline.dumpNodesTo($('#timeline-wrap'));
