const uuid = require("uuid/v4");

function createDataBase() {
  const store = [
    {
      id: "unmanned_aerial_vehicle",
      childLayers: [],
      options: {},
      services: [
        // {
        //   service: "static",
        //   options: {}
        // }
        {
          service: "realtime",
          options: { delay: 500 }
        }
      ],
      objects: {
        endpoint: "real_data:detect_info_2-line",
        types: [
          {
            id: "unmanned_aerial_vehicle:flight_mission",
            format: {
              color: "blue"
            }
          },
          {
            id: "unmanned_aerial_vehicle:position",
            format: {}
          },
          {
            id: "unmanned_aerial_vehicle:traveled_distance",
            format: {
              color: "blue",
              dashArray: "10, 10",
              dashOffset: "0",
              opacity: 0.5
            }
          }
        ]
      }
    }
  ];
  return {
    getScheme: function(id) {
      const foundScheme = store.find(scheme => scheme.id === id);
      if (!foundScheme) {
        return false;
      }
      return { ...foundScheme };
    },
    getSchemes: function() {
      return store.map(scheme => ({ ...scheme }));
    }
    // createLayer: function(layer) {
    //   if (!layer) {
    //     return false;
    //   }
    //   db.push({
    //     name: layer.name,
    //     childLayers: layer.childLayers,
    //     objects: layer.objects
    //   });
    //   return db.length - 1;
    // },
    // updateLayer: function(id, layer) {
    //   if (!db[id]) {
    //     return false;
    //   }
    //   if (!layer) {
    //     return false;
    //   }
    //   db[id] = Object.assign({
    //     name: db[id].name,
    //     childLayers: layer.childLayers || db[id].childLayers,
    //     objects: layer.objects || db[id].objects
    //   });
    //   return id;
    // }
  };
}

module.exports = createDataBase;
