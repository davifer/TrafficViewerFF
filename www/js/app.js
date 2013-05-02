
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Receipt verification (https://github.com/mozilla/receiptverifier)
    require('receiptverifier');

    // Installation button
    require('./install-button');

    // Install the layouts
    require('layouts/layouts');

    // Write your app here.


    function formatDate(d) {
        return (d.getMonth()+1) + '/' +
            d.getDate() + '/' +
            d.getFullYear();
    }

    // List view

    var list = $('.list').get(0);
    list.add({ title: 'Madrid',  desc: 'Mapa de la ciudad de Madrid' });
        list.add({ title: 'Barcelona',  desc: 'Mapa de la ciudad de Barcelona' });


    for(var i=0; i<3; i++) {
        list.add({ title: 'Ciudad '+i,
                   desc: 'Mapa de la ciudad' });
    }

    // Detail view

 var map = null;
function initialize() {
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(40.416938, -3.703554),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.querySelector("#map-canvas"), mapOptions);

/*
  var image = '/img/bouddha.png';
  var myLatLng = new google.maps.LatLng(40.416938, -3.703554);
  var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image
  });

*/

  var ctaLayer = new google.maps.KmlLayer({
    url: 'http://www.davifer.es/trafico/camarasMadrid2.kml'
  });
  ctaLayer.setMap(map);

/*
  var ctaLayer = new google.maps.KmlLayer({
    url: 'http://davifer.googlepages.com/radares_fijos_120.kml'
  });
  ctaLayer.setMap(map);

  /*
var geoXml = new GGeoXml("http://davifer.googlepages.com/radares_fijos_100.kml");

var geoXml = new GGeoXml("http://davifer.googlepages.com/radares_camuflados_120.kml");

*/


}




    var detail = $('.detail').get(0);
    detail.render = function(item) {
    initialize();
    };


    // Edit view

    var edit = $('.edit').get(0);
    edit.render = function(item) {
        item = item || { id: '', get: function() { return ''; } };

        $('input[name=id]', this).val(item.id);
        $('input[name=title]', this).val(item.get('title'));
        $('input[name=desc]', this).val(item.get('desc'));
    };

    edit.getTitle = function() {
        var model = this.view.model;

        if(model) {
            return model.get('title');
        }
        else {
            return 'New';
        }
    };

    $('button.add', edit).click(function() {
        var el = $(edit);
        var title = el.find('input[name=title]');
        var desc = el.find('input[name=desc]');
        var model = edit.model;

        if(model) {
            model.set({ title: title.val(), desc: desc.val() });
        }
        else {
            list.add({ title: title.val(),
                       desc: desc.val()});
        }

        edit.close();
    });
});