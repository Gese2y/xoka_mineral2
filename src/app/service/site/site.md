<!-- <app-gis></app-gis> -->

<br>
<h2>Mineral Site </h2>
<br>


<div *ngIf="add_new_site">
  <div class="m-3">
    <div class="row">
      <div class="col-md-12">
        <form>
          <div class="row">
            <div class="col-md-6 row form-group">
              <label for="site_Id" class="font-weight-bold font-weight-bold col-sm-3 col-form-label" translate>Site
                ID</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" [(ngModel)]="site.site_Id" #site_Id="ngModel" name="site_Id"
                  placeholder="Site ID " id="site_Id" readonly required />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 row form-group">
              <label for="site_Name" class="font-weight-bold font-weight-bold col-sm-3 col-form-label" translate>Site
                Name</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" [(ngModel)]="site.site_Name" #site_Name="ngModel"
                  name="site_Name" placeholder=" Site Name" id="site_Name" required />
              </div>
            </div>

            <div class="col-md-6 row form-group">
              <label for="date_Registered" class="font-weight-bold font-weight-bold col-sm-3 col-form-label"
                translate>Registered Date</label>
              <div class="col-sm-6">
                <input type="datetime" class="form-control" [(ngModel)]="site.date_Registered"
                  #Date_Registered="ngModel" name="date_Registered" placeholder="Date Registered " id="date_Registered"
                   />
              </div>
            </div>
            <div class="col-md-6 row form-group">
              <label for="region" class="font-weight-bold font-weight-bold col-sm-3 col-form-label"
                translate>Region</label>
              <div class="col-sm-6">
                <select class="form-control" [(ngModel)]="site.region" #region="ngModel" name="region"
                  placeholder="region  " id="region" required>
                  <option disabled>select</option>
                  <option *ngFor="let Region of name_En" [value]="Region.region_Code">
                    {{ Region.description }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6 row form-group">
              <label for="coordinate" class="font-weight-bold font-weight-bold col-sm-3 col-form-label"
                translate>Coordinate</label>
              <!-- <div class="col-sm-1 ml-0 pl-0">
              <button type="button" class="btn btn-primary" [disabled]="disable" (click)="displayGIS=true"><span
                  class="fa fa-map"></span></button>
            </div> -->
              <div class="col-sm-6 flex">
                <input type="text" class="form-control form-control-sm" id="coordinate" placeholder="coordinate"
                  [(ngModel)]="SiteService.featureid" name="coordinate" (click)="SiteService.DisplayCoordinate=true"
                  readonly required >
              </div>
            </div>
            <p-dialog [(visible)]="SiteService.DisplayCoordinate" [closable]="true" [modal]="true" [responsive]="true"
              [style]="{'minHeight':'10%','height':'200px','minWidth':'10%','width':'80%' }" [maximizable]="true"
              [baseZIndex]="1200" (click)="ismapVisiblees=true">
              <p-header>
                <h4 class="modal-title pull-left" translate>Site Coordinate</h4>
              </p-header>
                <!-- <app-map></app-map> -->
                <div style="min-width: 600px">
                  <app-gis (gooo)="foo($event)" #childComponent></app-gis>
                </div>
                <!-- <div style="width: 600px; height: 700px">
                  <app-map></app-map>
                </div> -->
              <p-footer>
                <p-progressSpinner [style]="{width: '50px', height: '50px'}" strokeWidth="8" *ngIf="toogleSpin"></p-progressSpinner>
                <button type="button" class="btn btn-primary" *ngIf="!toogleSpin" (click)="select()" translate>select
                </button>
              </p-footer>
            </p-dialog>

            <div class="col-md-6 row form-group">
              <label for="zone" class="font-weight-bold font-weight-bold col-sm-3 col-form-label" translate>Zone</label>
              <div class="col-sm-6">
                <select class="form-control" [(ngModel)]="site.zone" #zone="ngModel" name="zone" placeholder="zone  "
                  id="zone" (click)="passdata($event)"required>
                  <option disabled>select</option>
                  <option *ngFor="let Zone of name_Ens" [value]="Zone.zone_code">
                    {{ Zone.description }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6 row form-group">
              <label for="status" class="font-weight-bold font-weight-bold col-sm-3 col-form-label" translate>Site
                Status</label>
              <div class="col-sm-6">
                <select class="custom-select custom-select-sm" id="status" name="status" required
                  [(ngModel)]="site.status">
                  <ng-container *ngFor="let Status of StatusList">
                    <option value="{{Status.lkdetail_code}}">
                      {{Status.english_description}}</option>
                  </ng-container>
                </select>
              </div>
            </div>
            <div class="col-md-6 row form-group">
              <label for="woreda" class="font-weight-bold font-weight-bold col-sm-3 col-form-label"
                translate>Woreda</label>
              <div class="col-sm-6">
                <select class="form-control" [(ngModel)]="site.woreda" #woreda="ngModel" name="woreda"
                  placeholder="woreda  " id="woreda" required>
                  <option disabled>select</option>
                  <option *ngFor="let Woreda of woredas" [value]="Woreda.woreda_code">
                    {{ Woreda.description }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6 row form-group">
              <label for="Is_Active" class="font-weight-bold font-weight-bold col-sm-3 col-form-label"
                translate>Is_Active</label>
              <div class="col-sm-6">
                <input type="checkbox" class="form-control" [(ngModel)]="site.is_Active" #Is_Active="ngModel"
                  name="Is_Active" placeholder=" Is_Active" id="Is_Active" />
              </div>
            </div>
            <div class="col-md-6 row form-group">
              <label for="kebele" class="font-weight-bold font-weight-bold col-sm-3 col-form-label" translate>Kebele
                Locality</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" [(ngModel)]="site.kebele_Locality" #kebele="ngModel"
                  name="kebele" placeholder="Kebele" id="kebele" />
              </div>
            </div>
            <div class="col-md-6 row form-group">
              <label for="remarks" class="font-weight-bold font-weight-bold col-sm-3 col-form-label"
                translate>Remarks</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" [(ngModel)]="site.remarks" #remarks="ngModel" name="remarks"
                  placeholder=" Remarks" id="remarks" />
              </div>
            </div>

            <div class="text-center col-12">

              <button  type="button" (click)="clear()" value="Save Item" class="btn btn-primary">
                Add New
              </button>
              <button *ngIf="!isEdit" type="button" style="margin-left: 10px;" (click)="saveData()" value="Save Item" class="btn btn-primary">
                Save
              </button>
              <button *ngIf="isEdit" style="margin-left: 10px;" mat-raised-button type="button" (click)="updatesite($event, site)"
                color="primary" class="btn btn-primary">
                Update
              </button>
              <button *ngIf="isEdit" style="margin-left: 10px;" mat-raised-button type="button" (click)="addnewsite()" color="primary"
                class="btn btn-primary">
                Cancel
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>




<div class="responsive-table">
  <p-table [value]="sites" [resizableColumns]="true" [paginator]="true" selectionMode="single" [metaKeySelection]="true"
   dataKey="site_Id"
    [rows]="2" [globalFilterFields]="['site_Name']" responsiveLayout="scroll"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" #Item_table>
    <ng-template pTemplate="caption">
      <div class="flex">
        <span class="p-input-icon-left ml-auto">
          <div style="width: 20%;">
            <label style="font-weight: bold;">Search</label>
            <input class="form-control" (input)="Item_table.filterGlobal($event.target.value, 'contains')"
              placeholder="Search by site name" />

          </div>
        </span>
      </div>
    </ng-template>
    <ng-template pTemplate="header">
      <tr>
        <!-- <th scope="col" translate>Site_ID</th> -->
        <th scope="col" translate>Site Name</th>
        <!-- <th scope="col" translate>Region</th>
        <th scope="col" translate>Zone</th>
        <th scope="col" translate>Woreda</th> -->
        <th scope="col" translate>Kebele Locality</th>
        <th scope="col" translate>Date Registered </th>
        <th scope="col" translate>Is Active</th>
        <th class='set_sticky_position' *ngIf="!add_new_site" scope="col">
          <button mat-raised-button (click)="addnewsite()" color="primary" type="button" class="btn btn-primary">Add / Update </button>
        </th>
        <!-- <th class="table-header-button-cell" scope="col" *ngIf="addnewsite">
          <button mat-raised-button type="button" (click)="addnewsite()" color="primary" type="button" class="btn btn-primary">
              Cancel
          </button>
      </th> -->

        <!-- <th></th> -->

      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-sites>
      <tr [pSelectableRow]="sites">
        <!-- <td (click)="selectsites(sites)">{{ sites.site_Id }}</td> -->
        <td (click)="selectsites(sites)">{{ sites.site_Name }}</td>
        <!-- <td (click)="selectsites(sites)">{{ sites.region }}</td>
        <td (click)="selectsites(sites)">{{ sites.zone }}</td>
        <td (click)="selectsites(sites)">{{ sites.woreda }}</td> -->
        <td (click)="selectsites(sites)">{{ sites.kebele_Locality }}</td>
        <td (click)="selectsites(sites)">{{ sites.date_Registered }}</td>
        <!-- <td>{{ sites.coordinate }}</td>/ -->
        <!-- <td>{{ sites.status }}</td> -->
        <td (click)="selectsites(sites)">{{ sites.is_Active }}</td>
        <!-- <td>{{ sites.remarks }}</td> -->
        <!-- <td>
          <button type="button" class="btn btn-primary" (click)="selectsites(sites)" translate>
            Select
          </button>

        </td> -->
        <td>

          <button type="button" class="btn btn-primary" (click)="deletesites(sites)">
            <i class="pi pi-trash"></i>
            Delete
          </button>
        </td>
      </tr>
    </ng-template>
  </p-table>

</div>
<!-- <br>
<div class="text-center col-12">
  <button style="margin-left: 1000px;" mat-raised-button type="button" (click)="selectsites()" color="primary" class="btn btn-primary">
    Next
</button>
</div>
<br> -->
