(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'game-of-life-mmo'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'game-of-life-mmo'.");
    }
    root['game-of-life-mmo'] = factory(typeof this['game-of-life-mmo'] === 'undefined' ? {} : this['game-of-life-mmo'], kotlin);
  }
}(this, function (_, Kotlin) {
  'use strict';
  var filter = Kotlin.kotlin.sequences.filter_euau3h$;
  var count = Kotlin.kotlin.sequences.count_veqyi0$;
  var hashCode = Kotlin.hashCode;
  var asList = Kotlin.kotlin.collections.asList_us0mfu$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var L0 = Kotlin.Long.ZERO;
  var L1 = Kotlin.Long.ONE;
  var L_1 = Kotlin.Long.NEG_ONE;
  var sequenceOf = Kotlin.kotlin.sequences.sequenceOf_i5x0yv$;
  var toList = Kotlin.kotlin.sequences.toList_veqyi0$;
  var toSet = Kotlin.kotlin.collections.toSet_7wnvza$;
  var asSequence = Kotlin.kotlin.collections.asSequence_7wnvza$;
  var map = Kotlin.kotlin.sequences.map_z5avom$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var addAll = Kotlin.kotlin.collections.addAll_ipc267$;
  var Unit = Kotlin.kotlin.Unit;
  var until = Kotlin.kotlin.ranges.until_if0zpk$;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var toList_0 = Kotlin.kotlin.collections.toList_us0mfu$;
  var getCallableRef = Kotlin.getCallableRef;
  var throwCCE = Kotlin.throwCCE;
  function Plane(living) {
    Plane$Companion_getInstance();
    this.living = living;
  }
  Plane.prototype.isAlive_7igoxl$ = function (coordinate) {
    return this.living.contains_11rb$(coordinate);
  };
  Plane.prototype.willLive_7igoxl$ = function (coordinate) {
    var livingNeighbors = this.livingNeighbors_0(coordinate);
    if (livingNeighbors === 3)
      return true;
    return this.living.contains_11rb$(coordinate) && livingNeighbors === 2;
  };
  function Plane$livingNeighbors$lambda(this$Plane) {
    return function (it) {
      return this$Plane.isAlive_7igoxl$(it);
    };
  }
  Plane.prototype.livingNeighbors_0 = function (coordinate) {
    return count(filter(get_neighbors(coordinate), Plane$livingNeighbors$lambda(this)));
  };
  Plane.prototype.equals = function (other) {
    return Kotlin.isType(other, Plane) && this.living.containsAll_brywnq$(other.living);
  };
  Plane.prototype.hashCode = function () {
    return hashCode(this.living);
  };
  function Plane$Companion() {
    Plane$Companion_instance = this;
  }
  Plane$Companion.prototype.plane_qc1vw6$ = function (livingCoordinate) {
    return new Plane(asList(livingCoordinate));
  };
  Plane$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Plane$Companion_instance = null;
  function Plane$Companion_getInstance() {
    if (Plane$Companion_instance === null) {
      new Plane$Companion();
    }
    return Plane$Companion_instance;
  }
  Plane.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Plane',
    interfaces: []
  };
  Plane.prototype.component1 = function () {
    return this.living;
  };
  Plane.prototype.copy_rq3yco$ = function (living) {
    return new Plane(living === void 0 ? this.living : living);
  };
  Plane.prototype.toString = function () {
    return 'Plane(living=' + Kotlin.toString(this.living) + ')';
  };
  function Coordinate(x, y) {
    Coordinate$Companion_getInstance();
    this.x = x;
    this.y = y;
  }
  Coordinate.prototype.plus_7igoxl$ = function (other) {
    return new Coordinate(this.x.add(other.x), this.y.add(other.y));
  };
  function Coordinate$Companion() {
    Coordinate$Companion_instance = this;
  }
  Coordinate$Companion.prototype.by_dqglrj$ = function ($receiver, y) {
    return new Coordinate(Kotlin.Long.fromInt($receiver), Kotlin.Long.fromInt(y));
  };
  Coordinate$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Coordinate$Companion_instance = null;
  function Coordinate$Companion_getInstance() {
    if (Coordinate$Companion_instance === null) {
      new Coordinate$Companion();
    }
    return Coordinate$Companion_instance;
  }
  Coordinate.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Coordinate',
    interfaces: []
  };
  Coordinate.prototype.component1 = function () {
    return this.x;
  };
  Coordinate.prototype.component2 = function () {
    return this.y;
  };
  Coordinate.prototype.copy_3pjtqy$ = function (x, y) {
    return new Coordinate(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Coordinate.prototype.toString = function () {
    return 'Coordinate(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Coordinate.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Coordinate.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  var relativeNeighbors;
  function get_possibleLivingCells($receiver) {
    var $receiver_0 = $receiver.living;
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver_0.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var list = toList(get_neighbors(element));
      addAll(destination, list);
    }
    return asSequence(toSet(destination));
  }
  function get_next$lambda(this$next) {
    return function (it) {
      return this$next.willLive_7igoxl$(it);
    };
  }
  function get_next($receiver) {
    return new Plane(toList(filter(get_possibleLivingCells($receiver), get_next$lambda($receiver))));
  }
  function get_neighbors$lambda(this$neighbors) {
    return function (it) {
      return this$neighbors.plus_7igoxl$(it);
    };
  }
  function get_neighbors($receiver) {
    return map(relativeNeighbors, get_neighbors$lambda($receiver));
  }
  function paint$lambda(closure$paint, closure$dimension) {
    return function (upperLeft, color) {
      closure$paint(new Square(new Coordinate(upperLeft.x.multiply(Kotlin.Long.fromInt(closure$dimension)), upperLeft.y.multiply(Kotlin.Long.fromInt(closure$dimension))), closure$dimension, color));
      return Unit;
    };
  }
  function paint$lambda_0(closure$paints) {
    return function (upperLeft) {
      closure$paints(upperLeft, '#FFFFE1');
      return Unit;
    };
  }
  function paint$lambda_1(closure$paints) {
    return function (upperLeft) {
      closure$paints(upperLeft, '#222228');
      return Unit;
    };
  }
  function paint($receiver, canvas, paint) {
    var dimension = canvas.width / $receiver.width | 0;
    var paints = paint$lambda(paint, dimension);
    var alive = paint$lambda_0(paints);
    var dead = paint$lambda_1(paints);
    var $receiver_0 = until(L0, $receiver.width);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver_0.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var $receiver_1 = until(L0, $receiver.height);
      var destination_0 = ArrayList_init_0(collectionSizeOrDefault($receiver_1, 10));
      var tmp$_0;
      tmp$_0 = $receiver_1.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        destination_0.add_11rb$(new Coordinate(element, item));
      }
      var list = destination_0;
      addAll(destination, list);
    }
    var destination_1 = ArrayList_init();
    var tmp$_1;
    tmp$_1 = destination.iterator();
    while (tmp$_1.hasNext()) {
      var element_0 = tmp$_1.next();
      if (!$receiver.living.contains_11rb$(element_0))
        destination_1.add_11rb$(element_0);
    }
    var tmp$_2;
    tmp$_2 = destination_1.iterator();
    while (tmp$_2.hasNext()) {
      var element_1 = tmp$_2.next();
      dead(element_1);
    }
    var tmp$_3;
    tmp$_3 = $receiver.living.iterator();
    while (tmp$_3.hasNext()) {
      var element_2 = tmp$_3.next();
      alive(element_2);
    }
  }
  function Square(upperLeft, dimension, color) {
    this.upperLeft = upperLeft;
    this.dimension = dimension;
    this.color = color;
  }
  Square.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Square',
    interfaces: []
  };
  Square.prototype.component1 = function () {
    return this.upperLeft;
  };
  Square.prototype.component2 = function () {
    return this.dimension;
  };
  Square.prototype.component3 = function () {
    return this.color;
  };
  Square.prototype.copy_2yebd$ = function (upperLeft, dimension, color) {
    return new Square(upperLeft === void 0 ? this.upperLeft : upperLeft, dimension === void 0 ? this.dimension : dimension, color === void 0 ? this.color : color);
  };
  Square.prototype.toString = function () {
    return 'Square(upperLeft=' + Kotlin.toString(this.upperLeft) + (', dimension=' + Kotlin.toString(this.dimension)) + (', color=' + Kotlin.toString(this.color)) + ')';
  };
  Square.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.upperLeft) | 0;
    result = result * 31 + Kotlin.hashCode(this.dimension) | 0;
    result = result * 31 + Kotlin.hashCode(this.color) | 0;
    return result;
  };
  Square.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.upperLeft, other.upperLeft) && Kotlin.equals(this.dimension, other.dimension) && Kotlin.equals(this.color, other.color)))));
  };
  function Canvas(width, height) {
    this.width = width;
    this.height = height;
  }
  Canvas.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Canvas',
    interfaces: []
  };
  Canvas.prototype.component1 = function () {
    return this.width;
  };
  Canvas.prototype.component2 = function () {
    return this.height;
  };
  Canvas.prototype.copy_vux9f0$ = function (width, height) {
    return new Canvas(width === void 0 ? this.width : width, height === void 0 ? this.height : height);
  };
  Canvas.prototype.toString = function () {
    return 'Canvas(width=' + Kotlin.toString(this.width) + (', height=' + Kotlin.toString(this.height)) + ')';
  };
  Canvas.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    return result;
  };
  Canvas.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height)))));
  };
  function Viewport(origin, width, height) {
    this.origin = origin;
    this.width = width;
    this.height = height;
  }
  Viewport.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Viewport',
    interfaces: []
  };
  Viewport.prototype.component1 = function () {
    return this.origin;
  };
  Viewport.prototype.component2 = function () {
    return this.width;
  };
  Viewport.prototype.component3 = function () {
    return this.height;
  };
  Viewport.prototype.copy_tp5ltl$ = function (origin, width, height) {
    return new Viewport(origin === void 0 ? this.origin : origin, width === void 0 ? this.width : width, height === void 0 ? this.height : height);
  };
  Viewport.prototype.toString = function () {
    return 'Viewport(origin=' + Kotlin.toString(this.origin) + (', width=' + Kotlin.toString(this.width)) + (', height=' + Kotlin.toString(this.height)) + ')';
  };
  Viewport.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.origin) | 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    return result;
  };
  Viewport.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.origin, other.origin) && Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height)))));
  };
  function View(living, width, height) {
    View$Companion_getInstance();
    this.living = living;
    this.width = width;
    this.height = height;
  }
  function View$Companion() {
    View$Companion_instance = this;
  }
  View$Companion.prototype.view_9298ja$ = function (width, height, living) {
    return new View(toList_0(living), width, height);
  };
  View$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var View$Companion_instance = null;
  function View$Companion_getInstance() {
    if (View$Companion_instance === null) {
      new View$Companion();
    }
    return View$Companion_instance;
  }
  View.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'View',
    interfaces: []
  };
  View.prototype.component1 = function () {
    return this.living;
  };
  View.prototype.component2 = function () {
    return this.width;
  };
  View.prototype.component3 = function () {
    return this.height;
  };
  View.prototype.copy_sdw7zc$ = function (living, width, height) {
    return new View(living === void 0 ? this.living : living, width === void 0 ? this.width : width, height === void 0 ? this.height : height);
  };
  View.prototype.toString = function () {
    return 'View(living=' + Kotlin.toString(this.living) + (', width=' + Kotlin.toString(this.width)) + (', height=' + Kotlin.toString(this.height)) + ')';
  };
  View.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.living) | 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    return result;
  };
  View.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.living, other.living) && Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height)))));
  };
  function get_viewport($receiver) {
    return new Viewport(Coordinate$Companion_getInstance().by_dqglrj$(-($receiver / 2 | 0) | 0, $receiver / 2 | 0), $receiver, $receiver);
  }
  function toView$between(closure$viewport, closure$farCorner) {
    return function (coordinate) {
      return between(coordinate, closure$viewport.origin, closure$farCorner);
    };
  }
  function toView$translateToView(closure$viewport) {
    return function (coordinate) {
      return translateToView(coordinate, closure$viewport.origin);
    };
  }
  function toView($receiver, viewport) {
    var farCorner = viewport.origin.plus_7igoxl$(Coordinate$Companion_getInstance().by_dqglrj$(viewport.width, -viewport.height | 0));
    var between = toView$between(viewport, farCorner);
    var translateToView = toView$translateToView(viewport);
    var coordinates = toList(map(filter(asSequence($receiver.living), getCallableRef('between', function (coordinate) {
      return between(coordinate);
    })), getCallableRef('translateToView', function (coordinate) {
      return translateToView(coordinate);
    })));
    return new View(coordinates, viewport.width, viewport.height);
  }
  function isBelow($receiver, other) {
    return $receiver.y.compareTo_11rb$(other.y) <= 0;
  }
  function isAbove($receiver, other) {
    return $receiver.y.compareTo_11rb$(other.y) > 0;
  }
  function isRightOf($receiver, other) {
    return $receiver.x.compareTo_11rb$(other.x) >= 0;
  }
  function isLeftOf($receiver, other) {
    return $receiver.x.compareTo_11rb$(other.x) < 0;
  }
  function between($receiver, topLeft, bottomRight) {
    return isBelow($receiver, topLeft) && isRightOf($receiver, topLeft) && isAbove($receiver, bottomRight) && isLeftOf($receiver, bottomRight);
  }
  function translateToView($receiver, origin) {
    return new Coordinate($receiver.x.subtract(origin.x), $receiver.y.unaryMinus().add(origin.y));
  }
  function main$lambda(closure$context) {
    return function (it) {
      closure$context.fillStyle = it.color;
      closure$context.fillRect(it.upperLeft.x.toNumber(), it.upperLeft.y.toNumber(), it.dimension, it.dimension);
      return Unit;
    };
  }
  function main$lambda_0(closure$canvas, closure$viewport, closure$paintSquare) {
    return function (it) {
      paintBoard(closure$canvas, closure$viewport, it, closure$paintSquare);
      return Unit;
    };
  }
  function main$lambda_1(closure$paint) {
    return function (message) {
      var tmp$;
      closure$paint(typeof (tmp$ = message.data) === 'string' ? tmp$ : throwCCE());
      return Unit;
    };
  }
  function main() {
    var tmp$, tmp$_0, tmp$_1;
    var dimension = 100;
    var viewport = get_viewport(100);
    var $receiver = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    $receiver.width = dimension;
    $receiver.height = dimension;
    var htmlCanvas = $receiver;
    var context = Kotlin.isType(tmp$_0 = htmlCanvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    var socket = new WebSocket('ws://localhost:8080/life');
    var canvas = new Canvas(dimension, dimension);
    var paintSquare = main$lambda(context);
    var paint = main$lambda_0(canvas, viewport, paintSquare);
    socket.onmessage = main$lambda_1(paint);
    (tmp$_1 = document.body) != null ? tmp$_1.appendChild(htmlCanvas) : null;
  }
  function paintBoard(canvas, viewport, boardString, paint_0) {
    paint(toView(get_asPlane(JSON.parse(boardString)), viewport), canvas, paint_0);
  }
  function get_asPlane($receiver) {
    var $receiver_0 = $receiver.living;
    var destination = ArrayList_init_0($receiver_0.length);
    var tmp$;
    for (tmp$ = 0; tmp$ !== $receiver_0.length; ++tmp$) {
      var item = $receiver_0[tmp$];
      destination.add_11rb$(get_asCoordinate(item));
    }
    return new Plane(destination);
  }
  function get_asCoordinate($receiver) {
    return new Coordinate(Kotlin.Long.fromInt($receiver.x), Kotlin.Long.fromInt($receiver.y));
  }
  Object.defineProperty(Plane, 'Companion', {
    get: Plane$Companion_getInstance
  });
  var package$io = _.io || (_.io = {});
  var package$pivotal = package$io.pivotal || (package$io.pivotal = {});
  var package$game = package$pivotal.game || (package$pivotal.game = {});
  var package$of = package$game.of || (package$game.of = {});
  var package$life = package$of.life || (package$of.life = {});
  var package$core = package$life.core || (package$life.core = {});
  package$core.Plane = Plane;
  Object.defineProperty(Coordinate, 'Companion', {
    get: Coordinate$Companion_getInstance
  });
  package$core.Coordinate = Coordinate;
  package$core.get_possibleLivingCells_y9givo$ = get_possibleLivingCells;
  package$core.get_next_y9givo$ = get_next;
  package$core.get_neighbors_jt1b12$ = get_neighbors;
  package$core.paint_op2e4v$ = paint;
  package$core.Square = Square;
  package$core.Canvas = Canvas;
  package$core.Viewport = Viewport;
  Object.defineProperty(View, 'Companion', {
    get: View$Companion_getInstance
  });
  package$core.View = View;
  package$core.get_viewport_s8ev3n$ = get_viewport;
  package$core.toView_lffx4d$ = toView;
  package$core.isBelow_ciqfml$ = isBelow;
  package$core.isAbove_ciqfml$ = isAbove;
  package$core.isRightOf_ciqfml$ = isRightOf;
  package$core.isLeftOf_ciqfml$ = isLeftOf;
  package$core.between_v70vsg$ = between;
  package$core.translateToView_ciqfml$ = translateToView;
  _.main = main;
  _.paintBoard_y5lktj$ = paintBoard;
  _.get_asPlane_nelylx$ = get_asPlane;
  _.get_asCoordinate_r2tmlr$ = get_asCoordinate;
  relativeNeighbors = sequenceOf([new Coordinate(L0, L1), new Coordinate(L1, L1), new Coordinate(L1, L0), new Coordinate(L1, L_1), new Coordinate(L0, L_1), new Coordinate(L_1, L_1), new Coordinate(L_1, L0), new Coordinate(L_1, L1)]);
  main();
  Kotlin.defineModule('game-of-life-mmo', _);
  return _;
}));

//# sourceMappingURL=game-of-life-mmo.js.map
