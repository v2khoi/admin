import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partial/header/header.component';
import { SidebarComponent } from './partial/sidebar/sidebar.component';
import { ConfigComponent } from './partial/config/config.component';
import { FilterComponent } from './partial/filter/filter.component';
import { PaginationComponent } from './partial/pagination/pagination.component';
import { ModalComponent } from './partial/modal/modal.component';
import { UsersComponent } from './components/users/users.component';
// import { LoginComponent } from './components/login/login.component';
import { GroupsComponent } from './components/groups/groups.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BreadcrumbComponent } from './partial/breadcrumb/breadcrumb.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PhonePipe } from './pipes/phone.pipe';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { SelectboxPipe } from './pipes/select.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ConfigComponent,
    FilterComponent,
    PaginationComponent,
    ModalComponent,
    UsersComponent,
    GroupsComponent,
    // LoginComponent,
    DashboardComponent,
    BreadcrumbComponent,
    PhonePipe,
    EscapeHtmlPipe,
    SelectboxPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
