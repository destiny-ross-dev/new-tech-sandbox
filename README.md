# NEW TECH SANDBOX

> Learning new technologies and implementing them into your work is one of the main tasks a webdev/software engineer faces. Instead of cluttering up my github with hundreds of small repos, I've decided to keep one master repo of all of the tech I'm learning. New, small projects where I begin to implement new languages, packages, services, or techniques will be listed here.

## Table of Contents

![alt text](./hooks-carousel/carousel-one.png "Carousel Component written with React Hooks")

-[Hooks Carousel](https://github.com/destiny-ross-dev/new-tech-sandbox/tree/master/hooks-carousel) - Since their introduction, React Hooks have been hailed as _the_ solution to state management, allowing developers to use state and other React features without writing a class. I implemented a carousel using the useState, useEffect, and useRefs hooks and even wrote my own hook, useInterval! For this component to work, I also had to learn about Javascript's setInterval and clearInterval functions.

```javascript
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    // Destroys timer on unmount
    return () => clearInterval(id);
  }, [delay]);
}
```

-[Modern Api](https://github.com/destiny-ross-dev/new-tech-sandbox/tree/master/modern-api) - A powerful and flexible web api built with Node, Hapi, GraphQL, and MongoDB.

-[CSV Upload and Parser](https://github.com/destiny-ross-dev/new-tech-sandbox/tree/master/upload-parse-csv-node-multer)
