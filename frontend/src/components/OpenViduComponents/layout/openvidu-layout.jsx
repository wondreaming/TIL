import { useEffect, useRef, useState } from "react";
import $ from "jquery";

function OpenViduLayout(props) {
  const layoutContainerRef = useRef(null);
  const [opts, setOpts] = useState({
    maxRatio: props.maxRatio != null ? props.maxRatio : 3 / 2,
    minRatio: props.minRatio != null ? props.minRatio : 9 / 16,
    fixedRatio: props.fixedRatio != null ? props.fixedRatio : false,
    animate: props.animate != null ? props.animate : false,
    bigClass: props.bigClass != null ? props.bigClass : "OT_big",
    bigPercentage: props.bigPercentage != null ? props.bigPercentage : 0.8,
    bigFixedRatio: props.bigFixedRatio != null ? props.bigFixedRatio : false,
    bigMaxRatio: props.bigMaxRatio != null ? props.bigMaxRatio : 3 / 2,
    bigMinRatio: props.bigMinRatio != null ? props.bigMinRatio : 9 / 16,
    bigFirst: props.bigFirst != null ? props.bigFirst : true,
  });

  useEffect(() => {
    if (layoutContainerRef.current.style.display === "none") {
      return;
    }

    const HEIGHT =
      getHeight(layoutContainerRef.current) -
      getCSSNumber(layoutContainerRef.current, "borderTop") -
      getCSSNumber(layoutContainerRef.current, "borderBottom");
    const WIDTH =
      getWidth(layoutContainerRef.current) -
      getCSSNumber(layoutContainerRef.current, "borderLeft") -
      getCSSNumber(layoutContainerRef.current, "borderRight");

    const availableRatio = HEIGHT / WIDTH;

    let offsetLeft = 0;
    let offsetTop = 0;
    let bigOffsetTop = 0;
    let bigOffsetLeft = 0;

    const bigOnes = Array.prototype.filter.call(
      layoutContainerRef.current.querySelectorAll(`#${id} > .${opts.bigClass}`),
      filterDisplayNone
    );
    const smallOnes = Array.prototype.filter.call(
      layoutContainerRef.current.querySelectorAll(`#${id} > *:not(.${opts.bigClass})`),
      filterDisplayNone
    );

    if (bigOnes.length > 0 && smallOnes.length > 0) {
      let bigWidth, bigHeight;

      if (availableRatio > getVideoRatio(bigOnes[0])) {
        bigWidth = WIDTH;
        bigHeight = Math.floor(HEIGHT * opts.bigPercentage);
        offsetTop = bigHeight;
        bigOffsetTop = HEIGHT - offsetTop;
      } else {
        bigHeight = HEIGHT;
        bigWidth = Math.floor(WIDTH * opts.bigPercentage);
        offsetLeft = bigWidth;
        bigOffsetLeft = WIDTH - offsetLeft;
      }

      if (opts.bigFirst) {
        arrange(
          bigOnes,
          bigWidth,
          bigHeight,
          0,
          0,
          opts.bigFixedRatio,
          opts.bigMinRatio,
          opts.bigMaxRatio,
          opts.animate
        );
        arrange(
          smallOnes,
          WIDTH - offsetLeft,
          HEIGHT - offsetTop,
          offsetLeft,
          offsetTop,
          opts.fixedRatio,
          opts.minRatio,
          opts.maxRatio,
          opts.animate
        );
      } else {
        arrange(
          smallOnes,
          WIDTH - offsetLeft,
          HEIGHT - offsetTop,
          0,
          0,
          opts.fixedRatio,
          opts.minRatio,
          opts.maxRatio,
          opts.animate
        );
        arrange(
          bigOnes,
          bigWidth,
          bigHeight,
          bigOffsetLeft,
          bigOffsetTop,
          opts.bigFixedRatio,
          opts.bigMinRatio,
          opts.bigMaxRatio,
          opts.animate
        );
      }
    } else if (bigOnes.length > 0 && smallOnes.length === 0) {
      arrange(
        bigOnes,
        WIDTH,
        HEIGHT,
        0,
        0,
        opts.bigFixedRatio,
        opts.bigMinRatio,
        opts.bigMaxRatio,
        opts.animate
      );
    } else {
      arrange(
        smallOnes,
        WIDTH - offsetLeft,
        HEIGHT - offsetTop,
        offsetLeft,
        offsetTop,
        opts.fixedRatio,
        opts.minRatio,
        opts.maxRatio,
        opts.animate
      );
    }
  }, [layoutContainerRef, opts]);

  function fixAspectRatio(elem, width) {
    const sub = elem.querySelector(".OT_root");
    if (sub) {
      const oldWidth = sub.style.width;
      sub.style.width = width + "px";
      sub.style.width = oldWidth || "";
    }
  }

  function positionElement(elem, x, y, width, height, animate) {
    const targetPosition = {
      left: x + "px",
      top: y + "px",
      width: width + "px",
      height: height + "px",
    };

    fixAspectRatio(elem, width);

    if (animate && $) {
      $(elem).stop();
      $(elem).animate(targetPosition, animate.duration || 200, animate.easing || "swing", () => {
        fixAspectRatio(elem, width);
        if (animate.complete) {
          animate.complete.call(this);
        }
      });
    } else {
      $(elem).css(targetPosition);
    }
    fixAspectRatio(elem, width);
  }

  function getVideoRatio(elem) {
    if (!elem) {
      return 3 / 4;
    }
    const video = elem.querySelector("video");
    if (video && video.videoHeight && video.videoWidth) {
      return video.videoHeight / video.videoWidth;
    } else if (elem.videoHeight && elem.videoWidth) {
      return elem.videoHeight / elem.videoWidth;
    }
    return 3 / 4;
  }

  function getCSSNumber(elem, prop) {
    const cssStr = $(elem).css(prop);
    return cssStr ? parseInt(cssStr, 10) : 0;
  }

  function cheapUUID() {
    return (Math.random() * 100000000).toFixed(0);
  }

  function getHeight(elem) {
    const heightStr = $(elem).css("height");
    return heightStr ? parseInt(heightStr, 10) : 0;
  }

  function getWidth(elem) {
    const widthStr = $(elem).css("width");
    return widthStr ? parseInt(widthStr, 10) : 0;
  }

  function getBestDimensions(minR, maxR, count, WIDTH, HEIGHT, targetHeight) {
    let maxArea, targetCols, targetRows, targetWidth, tWidth, tHeight, tRatio;

    for (let i = 1; i <= count; i++) {
      const colsAux = i;
      const rowsAux = Math.ceil(count / colsAux);

      tHeight = Math.floor(HEIGHT / rowsAux);
      tWidth = Math.floor(WIDTH / colsAux);

      tRatio = tHeight / tWidth;
      if (tRatio > maxR) {
        tRatio = maxR;
        tHeight = tWidth * tRatio;
      } else if (tRatio < minR) {
        tRatio = minR;
        tWidth = tHeight / tRatio;
      }

      const area = tWidth * tHeight * count;

      if (maxArea === undefined || area > maxArea) {
        maxArea = area;
        targetHeight = tHeight;
        targetWidth = tWidth;
        targetCols = colsAux;
        targetRows = rowsAux;
      }
    }
    return {
      maxArea: maxArea,
      targetCols: targetCols,
      targetRows: targetRows,
      targetHeight: targetHeight,
      targetWidth: targetWidth,
      ratio: targetHeight / targetWidth,
    };
  }

  function arrange(
    children,
    WIDTH,
    HEIGHT,
    offsetLeft,
    offsetTop,
    fixedRatio,
    minRatio,
    maxRatio,
    animate
  ) {
    let targetHeight;

    const count = children.length;
    let dimensions;

    if (!fixedRatio) {
      dimensions = getBestDimensions(minRatio, maxRatio, count, WIDTH, HEIGHT, targetHeight);
    } else {
      const ratio = getVideoRatio(children.length > 0 ? children[0] : null);
      dimensions = getBestDimensions(ratio, ratio, count, WIDTH, HEIGHT, targetHeight);
    }

    let x = 0,
      y = 0;
    const rows = [];
    let row;

    for (let i = 0; i < children.length; i++) {
      if (i % dimensions.targetCols === 0) {
        row = {
          children: [],
          width: 0,
          height: 0,
        };
        rows.push(row);
      }
      const elem = children[i];
      row.children.push(elem);
      let targetWidth = dimensions.targetWidth;
      targetHeight = dimensions.targetHeight;
      if (fixedRatio) {
        targetWidth = targetHeight / getVideoRatio(elem);
      }
      row.width += targetWidth;
      row.height = targetHeight;
    }

    let totalRowHeight = 0;
    let remainingShortRows = 0;

    for (let i = 0; i < rows.length; i++) {
      row = rows[i];
      if (row.width > WIDTH) {
        row.height = Math.floor(row.height * (WIDTH / row.width));
        row.width = WIDTH;
      } else if (row.width < WIDTH) {
        remainingShortRows += 1;
      }
      totalRowHeight += row.height;
    }

    if (totalRowHeight < HEIGHT && remainingShortRows > 0) {
      let remainingHeightDiff = HEIGHT - totalRowHeight;
      totalRowHeight = 0;

      for (let i = 0; i < rows.length; i++) {
        row = rows[i];
        if (row.width < WIDTH) {
          let extraHeight = remainingHeightDiff / remainingShortRows;
          if (extraHeight / row.height > (WIDTH - row.width) / row.width) {
            extraHeight = Math.floor(((WIDTH - row.width) / row.width) * row.height);
          }
          row.width += Math.floor((extraHeight / row.height) * row.width);
          row.height += extraHeight;
          remainingHeightDiff -= extraHeight;
          remainingShortRows -= 1;
        }
        totalRowHeight += row.height;
      }
    }

    y = (HEIGHT - totalRowHeight) / 2;

    for (let i = 0; i < rows.length; i++) {
      row = rows[i];
      const rowMarginLeft = (WIDTH - row.width) / 2;
      x = rowMarginLeft;
      for (let j = 0; j < row.children.length; j++) {
        const elem = row.children[j];
        let targetWidth = dimensions.targetWidth;
        targetHeight = row.height;
        if (fixedRatio) {
          targetWidth = Math.floor(targetHeight / getVideoRatio(elem));
        }
        elem.style.position = "absolute";
        const actualWidth =
          targetWidth -
          getCSSNumber(elem, "paddingLeft") -
          getCSSNumber(elem, "paddingRight") -
          getCSSNumber(elem, "marginLeft") -
          getCSSNumber(elem, "marginRight") -
          getCSSNumber(elem, "borderLeft") -
          getCSSNumber(elem, "borderRight");
        const actualHeight =
          targetHeight -
          getCSSNumber(elem, "paddingTop") -
          getCSSNumber(elem, "paddingBottom") -
          getCSSNumber(elem, "marginTop") -
          getCSSNumber(elem, "marginBottom") -
          getCSSNumber(elem, "borderTop") -
          getCSSNumber(elem, "borderBottom");
        positionElement(elem, x + offsetLeft, y + offsetTop, actualWidth, actualHeight, animate);
        x += targetWidth;
      }
      y += targetHeight;
    }
  }

  function filterDisplayNone(element) {
    return element.style.display !== "none";
  }

  return <div ref={layoutContainerRef}>{/* Children components go here */}</div>;
}

export default OpenViduLayout;
