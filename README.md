# Learn React

git@gitlab.com:alessandro.piccione/spikes.react.git
https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/README.md

To run the app:
- ``yarn start``
- ``npm start`` or ``npm run start``

## Courses:

- React Fundamentals on Pluralsight: https://app.pluralsight.com/course-player?clipId=9bd76a89-6388-4662-9346-98fa57976263
- https://redux.js.org/tutorials/fundamentals/part-1-overview
- Using React Hooks (by Peter Kellner) on Pluralsight

## React Playgrounds

If you’re interested in playing around with React, you can use an online code playground. 
Try a Hello World template on [CodePen](https://reactjs.org/redirect-to-codepen/hello-world),
 [CodeSandbox](https://codesandbox.io/s/new), or [Stackblitz](https://stackblitz.com/fork/react).

## Typescript

- From the beginning 
Use *--template typescript*  
``yarn create react-app my-app --template typescript``

- Add later
https://create-react-app.dev/docs/adding-typescript/
```
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```
and rename all .js to * .tsx  

Didn't worked straight.  
Needed to change reportWebVitals.tsx file

## Boostrap
The project use [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

## Tests
Cannot use **enzyme** because an adapter for React 17 does not exists yet.  
A lot of problem trying to run tests where the component ``setState()`` is called while the component is not "mounted".  
> Can't call setState on a component that is not yet mounted.
