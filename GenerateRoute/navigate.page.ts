import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {} from 'googlemaps';

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
  selector: 'app-navigate',
  templateUrl: './navigate.page.html',
  styleUrls: ['./navigate.page.scss'],
})
export class NavigatePage implements OnInit, AfterViewInit {
  @ViewChild('mapElement', { static: true }) mapNativeElement;
  @ViewChild('directionsPanel' , { static: true }) directionsPanel: ElementRef;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay= new google.maps.DirectionsRenderer;
    directionForm: FormGroup;
    currentLocation: any = {
    lat: 0,
    lng: 0

  };

      GoogleAutocomplete: google.maps.places.AutocompleteService;
      autocomplete: { input: string; };
      autocomplete2: { input: string; };
      autocompleteItems: any[];
      autocompleteItems2: any[];
      location: any;
      placeid: any;
      loading: boolean = false;
      addressInput: string = '';
      predictions: Object[];
      selectedAddress: any;
      errorMessage: string;

    constructor(private fb: FormBuilder, public alertController: AlertController, private geolocation: Geolocation, public zone: NgZone) {
      this.createDirectionForm();

      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocomplete2 = { input: '' };
      this.autocompleteItems = [];
      this.autocompleteItems2 = [];
    }


    createDirectionForm() {
      this.directionForm = this.fb.group({
        source: ['', Validators.required],
        destination: ['', Validators.required]
      });
    }

    ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges()
  }
    ngAfterViewInit(): void {
      map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        zoom: 11,
        center: {lat: 1.290270, lng: 103.851959}
      });
      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    }

    updateSearchResults(){
      if (this.autocomplete.input == " ") {
        this.autocompleteItems = [];
        return;
      }
      this.GoogleAutocomplete.getPlacePredictions({
        input: this.autocomplete.input,
        componentRestrictions:{country: 'sg'}
      },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
    });
    }
    updateSearchResults2(){
      if (this.autocomplete.input2 == '') {
        this.autocompleteItems2 = [];
        return;
      }
      this.GoogleAutocomplete.getPlacePredictions({
        input: this.autocomplete.input2,
        componentRestrictions:{country: 'sg'}
      },
      (predictions, status) => {
        this.autocompleteItems2 = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems2.push(prediction);
          });
        });
    });
    }
    selectSearchResult(item) {
      console.log(item)
      this.location = item
      this.name = this.location.structured_formatting.main_text
      console.log('name'+ this.name)
      this.autocomplete.input = this.name
      this.autocompleteItems = [];
    }

    selectSearchResult2(item) {
      console.log(item)
      this.location = item
      this.name = this.location.structured_formatting.main_text
      console.log('name'+ this.name)
      this.autocomplete.input2 = this.name
      this.autocompleteItems2 = [];

    }

    async invalidRoute(status) {
      const alert = await this.alertController.create({
        header: 'Alert',
        //CHANGE THE ERROR MESSAGE
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
        this.getlatandlang(response.routes[routenum].overview_path);
        sRoute = new google.maps.DirectionsRenderer({
            polylineOptions: {
              strokeColor: "black",
              strokeOpacity: 0.5
            },
            map: map,
            directions: response,
            routeIndex: routenum,

        });
        for(var i = response.routes.length-1; i >= 0; i--){
          if( i == routenum && i != 0 && i == response.routes.length-1){
          response.routes.splice(0, i);
            }
          else if( i == routenum && i != 0 && i != response.routes.length-1){
            response.routes.pop();
            response.routes.splice(0, i-1);
          }
          else{
            response.routes.splice(i, response.routes.length-1);
          }
          }
        this.directionsDisplay.setDirections(response);
        scounter++;
      }
    }


       getlatandlang(selectedroute): void{
          let latlist:string[] = [""];
          let langlist:string[] = [""];
          let latlanglist:string[] = [""];
          //let userlatlang:string = "";
          //loop through the different latitude & longitude
          //between the Start and End point
          for (let i in selectedroute)
          {
             latlist[i] = [selectedroute[i].lat()];
             langlist[i] = [selectedroute[i].lng()];
          }

            this.trackroute(latlist, langlist)
        }




        trackroute(latlist, langlist): void{
            let userlatlang:string = "";
            let distCheckpoint:string = "";
            let userlocation:string = "";
            let checkpoint:string = "";
            let useronthemove:string = "";
            let counter: number = 0;
            let marker: string = "";


            //get current position
            navigator.geolocation.getCurrentPosition(function(position){
              userlatlang = (position.coords.latitude + ", " + position.coords.longitude);
              userlocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

             if(!marker){
                 marker = new google.maps.Marker({
                 position: userlocation,
                 label: {
                   text: 'C',
                   color: 'yellow',
                 },
                 map: map
               });
             }else{
               this.marker.setPosition(location);
             }

              for (let i in latlist)
              {
                checkpoint = new google.maps.LatLng(latlist[i], langlist[i]);
                distCheckpoint = new google.maps.geometry.spherical.computeDistanceBetween(userlocation, checkpoint);
                //console.log(distCheckpoint)
              }


            });
           }
  }

/*
    createDirectionForm() {
      this.directionForm = this.fb.group({
        //source: ['', Validators.required],
        destination: ['', Validators.required]
      });
    }
   ngAfterViewInit(): void {
     this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 15,
      center: {lat: 1.290270, lng: 103.851959}
    });
    this.directionsDisplay.setMap(map);
    this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);
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
     this.directionsService.route({
       origin: this.currentLocation,
       destination: formValues.destination,
       travelMode: 'WALKING'
     }, (response, status) => {
       if (status === 'OK') {
         that.directionsDisplay.setDirections(response);
       } else {
         window.alert('Directions request failed due to ' + status);
       }
     });
   }
*/
