// @flow
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/forkJoin';

const list = [
  'abigail-keenan-17651-unsplash.jpg',
  'abigail-keenan-83615-unsplash.jpg',
  'alex-blajan-223771-unsplash.jpg',
  'alexander-shustov-73-unsplash.jpg',
  'alexey-ruban-103990-unsplash.jpg',
  'alfons-morales-410757-unsplash.jpg',
  'andrew-neel-237802-unsplash.jpg',
  'antonis-spiridakis-57308-unsplash.jpg',
  'artem-sapegin-176819-unsplash.jpg',
  'benjamin-combs-27619-unsplash.jpg',
  'brenda-godinez-373449-unsplash.jpg',
  'clay-banks-170882-unsplash.jpg',
  'colby-thomas-79701-unsplash.jpg',
  'd-c-m-nh-265159-unsplash.jpg',
  'eric-ward-342202-unsplash.jpg',
  'francisco-moreno-53323-unsplash.jpg',
  'frank-mckenna-219857-unsplash.jpg',
  'gabriel-nunes-58614-unsplash.jpg',
  'garrett-parker-247225-unsplash.jpg',
  'henri-meilhac-172354-unsplash.jpg',
  'jack-alexander-142193-unsplash.jpg',
  'jack-hamilton-320934-unsplash.jpg',
  'jacob-repko-438591-unsplash.jpg',
  'jakob-owens-208991-unsplash.jpg',
  'jenna-s-416404-unsplash.jpg',
  'jilbert-ebrahimi-67777-unsplash.jpg',
  'john-hult-93012-unsplash.jpg',
  'keagan-henman-419532-unsplash.jpg',
  'keagan-henman-430652-unsplash.jpg',
  'les-anderson-202336-unsplash.jpg',
  'luca-bravo-217276-unsplash.jpg',
  'luke-michael-27050-unsplash.jpg',
  'mark-solarski-183866-unsplash.jpg',
  'markus-gjengaar-162730-unsplash.jpg',
  'markus-spiske-109588-unsplash.jpg',
  'markus-spiske-135768-unsplash.jpg',
  'martin-widenka-550481-unsplash.jpg',
  'mec-rawlings-264513-unsplash.jpg',
  'melan-cholia-277731-unsplash.jpg',
  'mr-cup-fabien-barral-86068-unsplash.jpg',
  'nathan-mcbride-462758-unsplash.jpg',
  'nik-macmillan-284747-unsplash.jpg',
  'olga-delawrence-372971-unsplash.jpg',
  'pablo-heimplatz-317359-unsplash.jpg',
  'patrick-brinksma-150179-unsplash.jpg',
  'peter-feghali-354275-unsplash.jpg',
  'rakicevic-nenad-501606-unsplash.jpg',
  'ricardo-viana-105232-unsplash.jpg',
  'samuel-zeller-118227-unsplash.jpg',
  'taylor-l-spurgeon-146272-unsplash.jpg',
  'vero-photoart-176526-unsplash.jpg',
];

const path = './unsplash/';
export default function getImages() {
  return Observable.forkJoin(
    list.map(name => {
      const promise: Promise<string> = new Promise(resolve => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          canvas.getContext('2d').drawImage(image, 0, 0);
          resolve(canvas.toDataURL('image/jpeg'));
        };
        image.src = path + name;
      });
      return Observable.fromPromise(promise);
    }),
  );
}
