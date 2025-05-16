## This project uses the following data layer events:

1. view_item_list,
2. select_item,
3. user_login,
4. view_item,
5. generate_lead,
6. page_view,
7. dataLoad - Needs to be able to fetch the user information locally, instead of from the API
8. add_to_wishlist,

## Specific components that use Datalayer events:

1. PropertyListSection.tsx
2. PropertySuggestionSlider.tsx
3. IntroBlockProperties.tsx

## For questions please refer to the original task and documentation:

[Task](https://projects.zoho.com/portal/dengun#taskdetail/970116000021180331/970116000022827019/970116000022850033)

[Documentation](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm&hl=pt-br)

## Notes

### Please make sure this component is present in every page of the website:
    < DataLayerDataLoadEventComponent />
Which is related to the dataLoad event.
