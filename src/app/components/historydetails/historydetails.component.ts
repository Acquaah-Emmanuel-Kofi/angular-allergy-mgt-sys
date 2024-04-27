import { ApplicationModule, Component, OnInit,SecurityContext } from '@angular/core';
import { AllergiesService } from '../../services/data/allergies.service';
import { ActivatedRoute } from '@angular/router';
import { History } from '../../interfaces/allergies.interface';
import { CommonModule } from '@angular/common';
import { provideMarkdown,MarkdownModule,MarkedRenderer,MarkedOptions, MARKED_OPTIONS } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historydetails',
  standalone: true,
  imports: [CommonModule,ApplicationModule,MarkdownModule],
  templateUrl: './historydetails.component.html',
  styleUrls: ['./historydetails.component.scss'],
  providers: [AllergiesService,provideMarkdown(),provideMarkdown({ loader: HttpClient }),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
      },
    }),


  ],
})
export class HistorydetailsComponent implements OnInit {
  
  itemId?: string;
  itemData?: History;

  constructor(private _allergies: AllergiesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      this.getData();
    });
  }

  getData() {
    this._allergies.getALlergyDetails(this.itemId).subscribe(data => {
      this.itemData = data;
    });
  }


   
}



export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="mb-[30px] border-l-4 border-teal-400 pl-4"><p>' + text + '</p></blockquote>';
  };

  renderer.list = (body: string, ordered: boolean) => {
    if (ordered) {
      return '<ol class="ml-[50px] mb-[30px] list-decimal list-outside marker:text-teal-400  pl-5 space-y-3 text-slate-500">' + body + '</ol>';
    } else {
      return '<ul class="ml-[50px] mb-[30px] list-disc list-outside marker:text-teal-400  pl-5 space-y-3 text-slate-500">' + body + '</ul>';
    }
  }

  renderer.br = () => {
    return '<br class="my-2">';
  }

  renderer.heading = (text: string, level: number) => {
    return '<h' + {level} + ' class="header mb-[30px] text-teal-400 dark:text-white">' + text + '</h' + {level} + '>';
  }

  renderer.paragraph = (text: string) => {
    return '<p class="text-teal-700 mb-[10px] ">' + text + '</p>';
  }

  renderer.em = (text: string) => {
    return '<em class="text-teal-700 text-[30px] font-bold">' + text + '</em>';
  }

  renderer.strong = (text: string) => {
    return '<strong class="text-teal-700 text-[20px] font-bold">' + text + '</strong>';
  }

  renderer.codespan = (text: string) => {
    return '<code class="text-teal-700 text-[16px] font-bold">' + text + '</code>';
  }

  renderer.hr = () => {
    return '<hr class="my-2 bg-teal-400">';
  }



  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
  };
}