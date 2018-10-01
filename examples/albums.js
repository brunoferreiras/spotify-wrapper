import { searchAlbums } from '../src/main';
global.fetch = require('node-fetch');


const albums = searchAlbums('Incubus');

albums.then(data => data.albuns.items.map(item => console.log(item.name)));
