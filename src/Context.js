function createContext() {
  var contents = [];
  function pushContent(type) {
    contents.push({
      index: contents.length,
      type: type,
      params: [],
      data: null,
      isContentType: function(type) {
        return this.type === type;
      },
      isArray: function() {
        return this.isContentType("array");
      },
      isObject: function() {
        return this.isContentType("object");
      },
      setParam: function(key, value) {
        this.params[key] = value;
      },
      getParam: function(key) {
        return this.params[key];
      },
      release: function() {
        releaseContext(this.index);
      },
      setData: function (data) {
        this.data = data;
      },
      getData: function () {
        return this.data;
      },
      getParent: function () {
        if (this.index === 0) {
          throw new Error("Parent is beginning point. " +
            "You shall not go back more! Go back to shadow! :)");
        }
        return getContent(this.index -1);
      }
    });
    return contents[contents.length - 1];
  }
  function getContent(index) {
    return contents[index];
  }
  function releaseContext(index) {
    contents.splice(index, 1);
  }
  function getCurrentContent() {
    return contents[contents.length - 1];
  }
  function getLastContentWithType(type) {
    for (var i = contents.length -1; i >= 0; i--) {
      if (contents[i].isContentType(type)) {
        return contents[i];
      }
    }
    return null;
  }
  return {
    pushContent: pushContent,
    getCurrentContent: getCurrentContent,
    getLastContentWithType: getLastContentWithType
  };
}

module.exports = {
  createContext: createContext
};
