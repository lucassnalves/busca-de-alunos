var map;
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);


function BuscaLista()
{
    $.ajax({
        type: "POST",
        dataType: "html",
        url: "/Home/ListaAlunos",
        success: function (result) {
                    
            $("#ulLista").html(result);

        }
    });
}

function buscaRA(txtRA) {
    
    if(txtRA == "")
        return false;

    var lat;
    var lng;
    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/mapsengine/v1/tables/16301484656389751053-01619059540675406410/features?where=RA_Aluno=" + txtRA + "&version=published&key=AIzaSyAsrcj7OColofVBkQHQOJDL0_dIQxGjyjY",
        dataType: "json",
        success: function (json) {

            if (json.features.length == 0) {
                $("#txtRA").val("");
                $("#txtRA").attr("placeholder", "RA não encontrada.");
                return false;
            }

            lat = json.features[0].properties.lat;
            lng = json.features[0].properties.lng;

            var myLatlng = new google.maps.LatLng(lat, lng);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'RA ' + txtRA
            });
            map.setCenter(marker.getPosition());
            map.setZoom(17);

            contentString = '<dl class="dl-horizontal">' +
                                        '<dt>RA:</dt>' +
                                        '<dd>' + txtRA + '</dd>' +
                                        '<dt>Rua:</dt>' +
                                        '<dd>' + json.features[0].properties.End_Rua + '</dd>' +
                                        '<dt>Nº:</dt>' +
                                        '<dd>' + json.features[0].properties.Numero + (json.features[0].properties.Complement != "" ? " - " + json.features[0].properties.Complement : "") + '</dd>' +
                                        '<dt>Bairro:</dt>' +
                                        '<dd>' + json.features[0].properties.Bairro + '</dd>' +
                                        '<dt>CEP:</dt>' +
                                        '<dd>' + json.features[0].properties.CEP + '</dd>' +
                                        '<dt>Cidade:</dt>' +
                                        '<dd>' + json.features[0].properties.Cidade + ' - ' + json.features[0].properties.Sigla_End_ + '</dd>' +
                                    '</dl>'

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            $.ajax({
                type: "POST",
                dataType: "html",
                url: "/Home/Salvar/",
                data: "RA=" + txtRA,
                success: function (html) {
                    BuscaLista();        
                }
            });

            
        },
        
        error: function (erro) {
            //console.log("erro");
        }
    });
}