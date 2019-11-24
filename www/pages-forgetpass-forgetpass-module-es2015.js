(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-forgetpass-forgetpass-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/forgetpass/forgetpass.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/forgetpass/forgetpass.page.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color='light'>\n    <ion-title>Reset password</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-buttons slot=\"start\">\n    <ion-back-button  defaultHref=\"/login\"></ion-back-button>\n</ion-buttons>\n\n<ion-content padding>\n  <div padding>\n    <h3>Reset password</h3>\n\n    <div>\n      <p> Please enter your registered email address below: </p>\n    </div>\n\n    <ion-item>\n        <ion-input placeholder=\"Email\" type=\"text\" [(ngModel)]= \"email\"></ion-input>\n    </ion-item>\n\n    <div>\n      <ion-button expand=\"block\" color=\"success\" [disabled]=\"!email\" (click) ='resetpw()'>Reset Password</ion-button>\n    </div>\n\n  </div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/forgetpass/forgetpass.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/forgetpass/forgetpass.module.ts ***!
  \*******************************************************/
/*! exports provided: ForgetpassPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgetpassPageModule", function() { return ForgetpassPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _forgetpass_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./forgetpass.page */ "./src/app/pages/forgetpass/forgetpass.page.ts");







const routes = [
    {
        path: '',
        component: _forgetpass_page__WEBPACK_IMPORTED_MODULE_6__["ForgetpassPage"]
    }
];
let ForgetpassPageModule = class ForgetpassPageModule {
};
ForgetpassPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_forgetpass_page__WEBPACK_IMPORTED_MODULE_6__["ForgetpassPage"]]
    })
], ForgetpassPageModule);



/***/ }),

/***/ "./src/app/pages/forgetpass/forgetpass.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/pages/forgetpass/forgetpass.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ZvcmdldHBhc3MvZm9yZ2V0cGFzcy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/forgetpass/forgetpass.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/forgetpass/forgetpass.page.ts ***!
  \*****************************************************/
/*! exports provided: ForgetpassPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgetpassPage", function() { return ForgetpassPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/es2015/index.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");






let ForgetpassPage = class ForgetpassPage {
    constructor(afAuth, alertController, router, user) {
        this.afAuth = afAuth;
        this.alertController = alertController;
        this.router = router;
        this.user = user;
    }
    ngOnInit() {
    }
    wrongEmail() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: "Wrong email",
                message: "Email not registered, please enter the correct email.",
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    successAlert() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: "Email sent",
                message: "Please follow the instructions sent to your email to proceed with resetting your password.",
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    resetpw() {
        this.afAuth.auth.sendPasswordResetEmail(this.email).then(data => {
            console.log(data);
            console.log("success");
            this.successAlert();
            this.router.navigate(['../login']);
        }).catch(err => {
            console.log("fail");
            this.wrongEmail();
        });
    }
};
ForgetpassPage.ctorParameters = () => [
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _user_service__WEBPACK_IMPORTED_MODULE_3__["UserReg"] }
];
ForgetpassPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-forgetpass',
        template: __webpack_require__(/*! raw-loader!./forgetpass.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/forgetpass/forgetpass.page.html"),
        styles: [__webpack_require__(/*! ./forgetpass.page.scss */ "./src/app/pages/forgetpass/forgetpass.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
        _user_service__WEBPACK_IMPORTED_MODULE_3__["UserReg"]])
], ForgetpassPage);



/***/ })

}]);
//# sourceMappingURL=pages-forgetpass-forgetpass-module-es2015.js.map