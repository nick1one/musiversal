

# musiversal
test task for musiversal.com

Creates simple API serving samples, tracks, and merging samples into one track.
Run server with UI.

Put your samples to **./data/samples** directory
Expect to find merged tracks in **./data/tracks** directory

**IMPORTANT NOTICE**
API using utility **ffmpeg** with additional compilation flags --enable-libmp3lame.
This is mandatory requirement must be installed first.
You can download static builds of ffmpeg from [here](https://johnvansickle.com/ffmpeg/). If you are lucky to use brew on MacOS, just run:
### `brew install ffmpeg`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the production mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start:dev`

Runs the app in the production mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

