import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'content',
    loadChildren: () => import('./content/content.module').then( m => m.ContentPageModule)
  },  {
    path: 'barangay-content',
    loadChildren: () => import('./barangay-content/barangay-content.module').then( m => m.BarangayContentPageModule)
  },
  {
    path: 'quiz-view',
    loadChildren: () => import('./quiz-view/quiz-view.module').then( m => m.QuizViewPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'politicians',
    loadChildren: () => import('./politicians/politicians.module').then( m => m.PoliticiansPageModule)
  },
  {
    path: 'controls-pop-over',
    loadChildren: () => import('./controls-pop-over/controls-pop-over.module').then( m => m.ControlsPopOverPageModule)
  },
  {
    path: 'mabalacat-history',
    loadChildren: () => import('./mabalacat-history/mabalacat-history.module').then( m => m.MabalacatHistoryPageModule)
  },
  {
    path: 'barangay',
    loadChildren: () => import('./barangay/barangay.module').then( m => m.BarangayPageModule)
  },
  {
    path: 'trivia',
    loadChildren: () => import('./trivia/trivia.module').then( m => m.TriviaPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
