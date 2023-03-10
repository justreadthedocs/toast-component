import React from 'react';

function useKeyboard(condition, callback) {
  React.useEffect(() => {
    const handleKeyDownEvent = (event) => {
      if (!condition(event)) {
        return;
      }

      callback();
    };

    window.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [condition, callback]);
}

export default useKeyboard;
