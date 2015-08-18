export class Viewer extends Object {}

const viewer = new Viewer();
viewer.id = 'me';

export function getViewer() {
  console.log('Returning viewer', viewer);
  return viewer;
}
