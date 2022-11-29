"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FormDisplayComponent = void 0;
var core_1 = require("@angular/core");
var Survey = require("survey-angular");
var FormDisplayComponent = /** @class */ (function () {
    function FormDisplayComponent(activatedRoute, service) {
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.completed = new core_1.EventEmitter();
        this.ID = 'surveyElementDisplay';
    }
    FormDisplayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            // this.formcode = params['formcode'];
            console.log(_this.service.getFormData(_this.formcode));
            _this.service.getFormData(_this.formcode).subscribe(function (data) {
                _this.viewform(data);
            }, function (error) { return console.log(error); });
            // console.log(this.data);
            // this.surveyModel = new Survey.Model(this.data);
            // Survey.SurveyNG.render('surveyElement', {model: this.surveyModel});
        });
    };
    FormDisplayComponent.prototype.viewform = function (data) {
        var _this = this;
        console.log("form-data", data, JSON.parse(this.formData));
        this.surveyModel = new Survey.Model(data);
        this.surveyModel.data = JSON.parse(this.formData);
        if (this.Mode) {
            this.surveyModel.mode = this.Mode; // 'display';
            Survey.SurveyNG.render(this.ID, { model: this.surveyModel });
        }
        else {
            Survey.SurveyNG.render(this.ID, { model: this.surveyModel });
            this.surveyModel.onComplete.add(function (result) {
                console.log('result', result);
                _this.completed.emit(result.data);
            });
        }
    };
    __decorate([
        core_1.Output()
    ], FormDisplayComponent.prototype, "completed");
    __decorate([
        core_1.Input()
    ], FormDisplayComponent.prototype, "formData");
    __decorate([
        core_1.Input()
    ], FormDisplayComponent.prototype, "formcode");
    __decorate([
        core_1.Input()
    ], FormDisplayComponent.prototype, "Mode");
    FormDisplayComponent = __decorate([
        core_1.Component({
            selector: 'app-form-display',
            templateUrl: './form-display.component.html',
            styleUrls: ['./form-display.component.css']
        })
    ], FormDisplayComponent);
    return FormDisplayComponent;
}());
exports.FormDisplayComponent = FormDisplayComponent;
