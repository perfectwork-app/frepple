/*
 * Copyright (C) 2017 by frePPLe bvba
 *
 * This library is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

'use strict';

angular.module('operationplandetailapp').directive('showoperationplanDrv', showoperationplanDrv);

showoperationplanDrv.$inject = ['$window'];

function showoperationplanDrv($window) {

  var directive = {
    restrict: 'EA',
    scope: {operationplan: '=data'},
    templateUrl: '/static/operationplandetail/operationplanpanel.html',
    link: linkfunc
  };
  return directive;

  function linkfunc(scope, elem, attrs) {
    //need to watch all of these because a webservice may change them on the fly
    scope.opptype={ //just a translation
      'MO': gettext('Manufacturing Order'),
      'PO': gettext('Purchase Order'),
      'DO': gettext('Distribution Order')
    }

    scope.$watchGroup(['operationplan.id','operationplan.start','operationplan.end','operationplan.quantity','operationplan.criticality','operationplan.delay','operationplan.status'], function () {
      if (typeof scope.operationplan !== 'undefined' && Object.keys(scope.operationplan).length > 0) {

        angular.element(elem).find('input[disabled]').attr('disabled',false);
        angular.element(elem).find('button[disabled]').attr('disabled',false);
        angular.element(elem).find('#statusrow .btn').removeClass('active');

        if (scope.operationplan.hasOwnProperty('start')) {
          angular.element(elem).find("#setStart").val(moment(scope.operationplan.start).format('YYYY-MM-DD HH:mm:ss'));
        }
        if (scope.operationplan.hasOwnProperty('end')) {
          angular.element(elem).find("#setEnd").val(moment(scope.operationplan.end).format('YYYY-MM-DD HH:mm:ss'));
        }

        if (scope.operationplan.hasOwnProperty('status')) {
          angular.element(elem).find('#statusrow .btn').removeClass('active');
          angular.element(elem).find('#'+scope.operationplan.status+'Btn').addClass('active');
        }
      }
    }); //watch end

    angular.element(elem).find(".vDateField").datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        useCurrent: false,
        calendarWeeks: true,
        minDate: '2000-01-01',
        inline: false,
        sideBySide: true,
        icons: {
          time: 'fa fa-clock-o',
          date: 'fa fa-calendar',
          up: 'fa fa-chevron-up',
          down: 'fa fa-chevron-down',
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-bullseye',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        },
        locale: language,
        widgetPositioning: {
          horizontal: 'left',
          vertical: 'bottom'
        }
      }).on("dp.change", function(e) {
        if (!e.oldDate || e.date == e.oldDate) {
          return;
        }
        if (e.target.id === 'setStart') {
          scope.$apply(function () {scope.operationplan.start=new moment(e.date).format("YYYY-MM-DDTHH:mm:ss");});
        }
        if (e.target.id === 'setEnd') {
          scope.$apply(function () {scope.operationplan.end=new moment(e.date).format("YYYY-MM-DDTHH:mm:ss");});
        }
      }).on('$destroy', function() {
        if ($(this).data('DateTimePicker') !== undefined){
          $(this).data('DateTimePicker').destroy();
        }
      });

  } //link end
} //directive end
