import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';



declare var google;
var map;
var gcounter=0;
var scounter=0;
var gRoute=[];
var sRoute;
var resp;
var startMarker;
var endMarker;


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, AfterViewInit{
  @ViewChild('mapElement', { static: true }) mapNativeElement;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionForm: FormGroup;
    constructor(private fb: FormBuilder, public alertController: AlertController) {
      this.createDirectionForm();
    }

    ngOnInit() {
    }

    createDirectionForm() {
      this.directionForm = this.fb.group({
        source: ['', Validators.required],
        destination: ['', Validators.required]
      });
    }

    ngAfterViewInit(): void {
      map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        zoom: 11,
        center: {lat: 1.290270, lng: 103.851959}
      });
      this.directionsDisplay.setMap(map);
    }

    async invalidRoute(status) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Directions request failed due to ' + status,
        buttons: ['OK']
    });

      await alert.present();
    }

    generateRoute(formValues) {
      const that = this;
      if (scounter != 0){
          sRoute.setMap(null);
        }
      scounter = 0;
      this.directionsService.route({
        origin: formValues.source,
        destination: formValues.destination,
        travelMode: 'WALKING',
        provideRouteAlternatives: true
      }, (response, status) => {
              if (status === 'OK') {
                resp = response;
                if (gcounter != 0){
                  for (var i = 0; i<gcounter; i++){
                    gRoute[i].setMap(null);
                  }
                  gcounter = 0;
                  startMarker.setMap(null);
                  endMarker.setMap(null);
                }

                that.drawRoute(resp, 0, null);
              }
              else {
               that.invalidRoute(status);
             }

      });
    }

    drawRoute(response, checker, routenum){
      const self = this;
      var color = [
        "green",
        "red",
        "blue"
      ];
      if (checker == 0) {
        var bounds = new google.maps.LatLngBounds();
         for (var h = 0, len = response.routes.length; h < len; h++) {
           gRoute[h] = new google.maps.Polyline({
             path: [],
             strokeColor: color[h],
             strokeWeight: 3,
             zIndex:h
           });
          var legs = response.routes[h].legs;
            for (var i = 0; i < legs.length; i++) {
              var steps = legs[i].steps;
             for (var j = 0; j < steps.length; j++) {
               var nextSegment = steps[j].path;
               for (var k = 0; k < nextSegment.length; k++) {
                 gRoute[h].getPath().push(nextSegment[k]);
                 bounds.extend(nextSegment[k]);
               }
             }
           }
           map.fitBounds(bounds);
         gRoute[h].setMap(map);
         gRoute[h].addListener('click', function(e) {
            self.drawRoute(resp, 1, this.zIndex);
             });
        gcounter++;
       }
        startMarker = new google.maps.Marker({
         position:gRoute[0].getPath().getAt(0),
         label: {
           text: 'A',
           color: 'white',
         },
         map:map
        });
        endMarker =  new google.maps.Marker({
          position:gRoute[0].getPath().getAt(gRoute[0].getPath().getLength()-1),
          label: {
            text: 'B',
            color: 'white',
          },
          map:map
        });
     }
      else{
        if (gcounter != 0){
          for (var i = 0; i<gcounter; i++){
            gRoute[i].setMap(null);
          }
          gcounter = 0;
        }
        if (scounter != 0){
            sRoute.setMap(null);
            scounter = 0;
        }
        startMarker.setMap(null);
        endMarker.setMap(null);
        sRoute = new google.maps.DirectionsRenderer({
            polylineOptions: {
              strokeColor: "black",
              strokeOpacity: 0.5
            },
            map: map,
            directions: response,
            routeIndex: routenum
        });
        scounter++;
      }
    }


  }
