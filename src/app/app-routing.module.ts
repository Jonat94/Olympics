import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  // {
  //   path: 'country/:id',
  //   component: SingleCountryComponent,
  // },
  // {
  //   path: '**', // wildcard
  //   component: NotFoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
