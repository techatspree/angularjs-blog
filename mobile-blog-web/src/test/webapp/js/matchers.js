
jasmine.Matchers.prototype.toEqualData = function(expected) {
    return angular.equals(this.actual, expected);
};
jasmine.Matchers.prototype.toEqualData = jasmine.Matchers.matcherFn_(
    'toEqualData',
    jasmine.Matchers.prototype.toEqualData
);
