import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {
  describe, it, beforeEach, afterEach,
} from 'mocha';
import {
  search, searchAlbuns, searchArtists, searchTracks, searchPlaylists,
} from '../src/main';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {

  describe('smoke tests', () => {
    // search (genérico) = + de 1 tipo
    // searchAlbuns
    // searchArtists
    // searchTracks
    // searchPlaylists
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      fetchedStub.resolves({ json: () => {} });
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artists');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artists');

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbuns = search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });
  });
});
