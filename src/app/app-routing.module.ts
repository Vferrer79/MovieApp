import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
  {
    path: '',
    loadChildren: () => import('./peliculas/listado.module').then(m => m.ListadoPageModule)
  },
  {
    path: 'detalle/:idPelicula',
    loadChildren: () => import('./peliculas/detalle.module').then( m => m.DetallePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
