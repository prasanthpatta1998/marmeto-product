window.addEventListener("DOMContentLoaded", () => {
  const getproductDetails = async () => {
    try {
      const response = await fetch(
        "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
      );
      if (response.ok) {
        const data = await response.json();

        const productData = data.product;

        const productActions = {
          activeColorId: "",
          selectedSize: "",
        };

        let productImage = document.querySelector("#product-image");
        productImage.src = productData.images[0].src;

        const thumbnailContainer = document.querySelector('#thumbnail-container')

        productData.images.forEach((eachImage,index) => {
          const image = document.createElement('img')
          image.src = eachImage.src
          image.alt = `thumbnail${index}`

          thumbnailContainer.appendChild(image)

          image.addEventListener('click', () => {
            productImage.src = image.src
            image.style.border = '2px solid blue'
          })
        });

        //  Images not displaying so i followed this way
        
        
        // document.querySelector("#thumbnail1").addEventListener("click", () => {
        //   productImage.src = document.querySelector("#thumbnail1").src;
        // });

        // document.querySelector("#thumbnail2").addEventListener("click", () => {
        //   productImage.src = document.querySelector("#thumbnail2").src;
        // });

        // document.querySelector("#thumbnail3").addEventListener("click", () => {
        //   productImage.src = document.querySelector("#thumbnail3").src;
        // });

        // document.querySelector("#thumbnail4").addEventListener("click", () => {
        //   productImage.src = document.querySelector("#thumbnail4").src;
        // });

        const price = parseFloat(productData.price.replace("$", ""));
        const compareAtPrice = parseFloat(
          productData.compare_at_price.replace("$", "")
        );

        const percentageOff = ((compareAtPrice - price) / compareAtPrice) * 100;

        const percentage = document.createElement("span");
        percentage.textContent = `${percentageOff.toFixed(0)}% Off`;

        document.querySelector("#vendor").textContent = productData.vendor;
        document.querySelector("#title").textContent = productData.title;
        document.querySelector("#price").textContent = productData.price;
        document.querySelector("#compare-at-price").textContent =
          productData.compare_at_price;

        document.querySelector("#price").appendChild(percentage);

        //Colors code
        const colorsContainer = document.querySelector("#colors-container");

        const clickIcon = document.createElement("span");

        productData.options[0].values.forEach((color, index) => {
          const displayColor = document.createElement("div");
          const colorName = Object.keys(color)[0];
          displayColor.style.backgroundColor = color[colorName];
          displayColor.classList.add("color");

          colorsContainer.appendChild(displayColor);

          displayColor.addEventListener("click", () => {

            productActions.activeColorId = colorName;
            clickIcon.classList.add(
              "fas",
              "fa-solid",
              "fa-check",
              "color-icon"
            );
            clickIcon.style.color = "#fff";
            displayColor.appendChild(clickIcon);
            displayColor.id = "active";
            displayColor.classList.add("color-icon-container");
            displayColor.style.outline = `3px solid ${color[colorName]}`;
            displayColor.style.outlineOffset = "4px";
          });
        });

        //Size Code

        const sizesContainer = document.querySelector("#choose-a-size");

        productData.options[1].values.forEach((size, index) => {
          const inputContainer = document.createElement("div");

          const input = document.createElement("input");
          const label = document.createElement("label");

          input.type = "radio";
          input.id = size.toLowerCase();
          input.name = "size";
          input.value = size;
          label.htmlFor = size.toLowerCase();
          label.textContent = size;

          inputContainer.appendChild(input);
          inputContainer.appendChild(label);

          sizesContainer.appendChild(inputContainer);
          inputContainer.addEventListener("click", () => {
            input.checked = true;
            productActions.selectedSize = input.value;
          });
        });

        let cartMessage = document.querySelector("#cart-item-message");
        cartMessage.style.display = "none";
        const cartButton = document.querySelector("#addtocart");
        cartButton.addEventListener("click", () => {
          cartMessage.style.display = "block";
          cartMessage.textContent = `Embrace sideboard with color ${productActions.activeColorId} and size ${productActions.selectedSize} added to cart`;
        });

        document.querySelector("#description").textContent =
          productData.description;
      } else {
        console.log("Error occur while fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  getproductDetails();

  const increment = document.querySelector("#increment");
  increment.addEventListener("click", () => {
    let value = document.querySelector("#value");
    value.textContent = parseInt(value.textContent) + 1;
  });

  const decrement = document.querySelector("#decrement");
  decrement.addEventListener("click", () => {
    let value = document.querySelector("#value");
    if (parseInt(value.textContent) > 0) {
      value.textContent = parseInt(value.textContent) - 1;
    }
  });
});
