/**
 * @author Till Hermsen
 * @date 31.10.12
 */

AppCtrl.$inject = ['$scope'];

function AppCtrl($scope) {
    $scope.header     = 'app/views/desktop/header.html';
    $scope.sidebar    = 'app/views/desktop/sidebar.html';
    $scope.navigation = 'app/views/desktop/navigation.html';
}
