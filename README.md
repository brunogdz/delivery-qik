# Delivery 

This is an app with React that makes to display the products and can buy!

All the data is from an external api, but for any future problems it gets from a alternative json file. 

This is structured in a simple way.

We have pages:
    - Contact
    - HomePage
    - MenuPage

The only page that we will check here is the Menu! 

The structure is based on Redux. So we have 3 functionalities
- Add
- Remove
- Clean

## Development

It was coded first mobile and then displayed on Desktop. The components that we are using is:

- ProductModal
- Basket
- Header
- CategorySection

# Context
The files that we are using for an alternative way if the api won't response. Based on the language field on the api, it will make the texts in English or Portuguese. 

- menuContext -> File for the menu data, alternative way if the api won't response
- translationContext -> Dictionary and using as alternative way if the api won't response
- storeContext -> File if needs to display something with Store information, it can be include on the future!

# Logic 
After the consumer clicks on Menu on the header, he will can search by the item name, filter on the type of the food, and search with filtered enable ( if the user wants to search only in the drinks for example, if clicks on drinks category and type the name it will search on the drinks category). 

If the user clicks on the product it opens a modal and can select the quantity or the modifiers, and add to the cart. 

On mobile on the bottom will see a button that opens the Basket modal and there can add more or decrease the quantity and if clicks to checkout it will clean the items ( it will redirect to payment in the future )

# Test

On this project I created the ProductModal test, to run, just run on the terminal 
```
npm test
```

# Shared URL

https://delivery-qik.vercel.app/

