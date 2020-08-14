"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseSearch;

var _Model = require("../../Model");

var _lifeCycle = require("../../utils/hooks/lifeCycle");

function useBaseSearch(_ref, config) {
  var namespace = _ref.namespace;
  var model = (0, _Model.useModel)({
    namespace: namespace,
    type: 'useBaseSearch'
  });
  var searchData = model.searchData;
  (0, _lifeCycle.useWillUnmount)(function () {
    (0, _Model.clearPageData)(namespace, 'searchData');
  });

  function onSearch(queryData) {
    var _getPageData = (0, _Model.getPageData)(namespace),
        current = _getPageData.current,
        pageSize = _getPageData.pageSize,
        onGetList = _getPageData.onGetList;

    if (onGetList) {
      onGetList({
        current: 1,
        pageSize: pageSize,
        queryData: queryData
      });
    }

    onSetSearchData(queryData);
  }

  function onSetSearchData() {
    var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _Model.setPageData)(namespace, 'searchData', queryData);
  }

  function onClearSearch() {
    (0, _Model.clearPageData)(namespace, 'searchData');
    return model.save('searchData', {});
  }

  return {
    loading: model.loading,
    config: config,
    data: searchData,
    model: model,
    handle: {
      onSearch: onSearch,
      onSetSearchData: onSetSearchData,
      onClearSearch: onClearSearch
    }
  };
}