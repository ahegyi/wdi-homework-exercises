/* Basic Carousel. Creates one with all of the images present inside container. */

// Add class="carousel" to a container that holds all of your images,
//  which should be absolutely positioned in the same spot.
// durationInSeconds should be the duration you want for each cross fade.
// easingType MUST be a function that takes a time value from [0,1],
//  and will return an output value from [0,1]

function Carousel(container, durationInSeconds, easingType) {
  var images = container.getElementsByTagName('img');
  var numImages = images.length;
  this.container = container;

  // we start out with the 0th image, according to z index layering below
  var currentIndex = 0;

  // this will set the Z indices of the images array to layer the first
  // on top, the second below that, the third below that, etc.
  
  function setZIndices() {
    // if the parent's container doesn't have a z-index,
    //   set it here.
    // otherwise, use the existing value and layer images on top
    if (container.style.zIndex === "") {
      container.style.zIndex = 10; // a wild guess
    }
    // create as many z indices as we need to for each image
    // (each image is separated by 1 z-index value)
    var maxZIndex = parseInt(container.style.zIndex, 10) + numImages;
    var zIndex = maxZIndex;
    for (var i = 0; i < numImages; i += 1) {
      images[i].style.zIndex = zIndex;
      zIndex -= 1;
    }
    return maxZIndex;
  }

  // set initial opacities to 0 for all images except first
  function initializeOpacities() {
    images[0].style.opacity = 1;
    for (var i = 1; i < numImages; i += 1) {
      images[i].style.opacity = 0;
    }
  }

  // the top layered image has maxZIndex
  var maxZIndex = setZIndices();
  // the lowest layered image has minZIndex
  var minZIndex = parseInt(container.style.zIndex, 10) + 1;


  // function currentImageIndex() {
  //   var currentMaxZIndex = images[0];
  //   var maxIndex = 0;
  //   // a simple maximum function
  //   for (var i = 1; i < numImages; i += 1) {
  //     if (images[i].style.zIndex > currentMaxZIndex) {
  //       currentMaxZIndex = images[i].style.zIndex;
  //       maxIndex = i;
  //     }
  //   }
  //   return maxIndex;
  // }

  function nextImage() {
    var nextIndex;

    if (currentIndex === numImages - 1) {
      nextIndex = 0;
    }
    else {
      nextIndex = parseInt(currentIndex, 10) + 1;
    }

    // update imageIdentifiers
    updateIdentifiers(nextIndex);

    // // cycle through images and update z indices
    // for (var i = 0; i < numImages; i += 1) {
    //   if (images[i].style.zIndex < maxZIndex) {
    //     images[i].style.zIndex = parseInt(images[i].style.zIndex, 10) + 1;
    //   }
    //   else {
    //     images[i].style.zIndex = minZIndex;
    //   }
    // }

    // get our fade on
    crossFadeEase(images[currentIndex], images[nextIndex], durationInSeconds, easingType);
    // update currentIndex to what we switched to
    currentIndex = nextIndex;
  }

  function previousImage() {
    var prevIndex;
    if (currentIndex === 0) {
      prevIndex = parseInt(numImages, 10) - 1;
    }
    else {
      prevIndex = parseInt(currentIndex, 10) - 1;
    }

    // update imageIdentifiers
    updateIdentifiers(prevIndex);

    // get our fade on
    crossFadeEase(images[currentIndex], images[prevIndex], durationInSeconds, easingType);
    // update currentIndex to what we switched to
    currentIndex = prevIndex;



    // // cycle through images and update z indices
    // for (var i = 0; i < numImages; i += 1) {
    //   if (images[i].style.zIndex > minZIndex) {
    //     images[i].style.zIndex = parseInt(images[i].style.zIndex, 10) - 1;
    //   }
    //   else {
    //     images[i].style.zIndex = maxZIndex;
    //   }
    // }
  }

  // used with the onclick event of an image identifier
  function goToImage() {
    // hacky (??) way of getting the element we've clicked
    var toIndex = parseInt(event.toElement.id.split("-")[2], 10);

    if (toIndex < 0 || toIndex > numImages) {
      return false;
    }

    // update imageIdentifiers
    updateIdentifiers(toIndex);
    // get our fade on
    crossFadeEase(images[currentIndex], images[toIndex], durationInSeconds, easingType);
    // update currentIndex to what we switched to
    currentIndex = toIndex;

  }

  //this.currentImageIndex = currentImageIndex;
  this.nextImage = nextImage;
  this.previousImage = previousImage;
  this.goToImage = goToImage;

  function addControls() {
    var leftNode = document.createElement("div");
    leftNode.className += " control control-left";
    // add the action!
    leftNode.onclick = previousImage;
    // this depends on CSS being 40px high for the control class, so we subtract half that
    leftNode.style.top = (images[0].height / 2) - 20;
    var leftP = document.createElement("p");
    var leftText = document.createTextNode("\u2039");
    leftP.appendChild(leftText);
    leftNode.appendChild(leftP);

    var rightNode = document.createElement("div");
    rightNode.className += " control control-right";
    // add the action!
    rightNode.onclick = nextImage;
    // this depends on CSS being 40px high for the control class, so we subtract half that
    rightNode.style.top = (images[0].height / 2) - 20;
    var rightP = document.createElement("p");
    var rightText = document.createTextNode("\u203A");
    rightP.appendChild(rightText);
    rightNode.appendChild(rightP);

    container.appendChild(leftNode);
    container.appendChild(rightNode);
  }

  function addImageIdentifiers() {
    var imageIdentifiersContainer = document.createElement("div");
    imageIdentifiersContainer.className += " image-identifiers";

    var imageIdentifiers = [];
    //var newIdentifier;

    for (var i = 0; i < numImages; i += 1) {
      newIdentifier = document.createElement("div");
      newIdentifier.className += " image-identifier";
      newIdentifier.id = "image-identifier-" + i.toString();
      // add the action!
      newIdentifier.onclick = goToImage;
      imageIdentifiers[i] = newIdentifier;
      imageIdentifiersContainer.appendChild(newIdentifier);
    }

    imageIdentifiers[0].className += " current";

    container.appendChild(imageIdentifiersContainer);

    return imageIdentifiers;
  }

  function updateIdentifiers(newIndex) {
    for (var i = 0; i < numImages; i += 1) {
      if (i === newIndex) {
        imageIdentifiers[i].className += " current";
      }
      else {
        imageIdentifiers[i].className = imageIdentifiers[i].className.replace("current", "");
      }
    }
  }

  function setContainerDimensions() {
    container.style.height = images[0].height;
    container.style.width = images[0].width;
  }

  addControls();
  this.imageIdentifiers = addImageIdentifiers();
  var imageIdentifiers = this.imageIdentifiers;
  initializeOpacities();
  setContainerDimensions();
}