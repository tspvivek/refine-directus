# refine-directus
[**Directus**](https://directus.io/) dataprovider package for refine.

## About

[**refine**](https://refine.dev/) offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to *admin panels*, *B2B applications* and *dashboards*.

## Documentation

For more detailed information and usage, refer to the [refine data provider documentation](https://refine.dev/docs/core/providers/data-provider).

## Install

```
npm install @tspvivek/refine-directus
```

## Example
Use below login details in example<br />
username: demo@demo.com<br />
password: 123456<br />
url: https://refine.dev/docs/examples/data-provider/directus/

## Notes
- To enable perform archive instead of delete with [**DeleteButton**](https://refine.dev/docs/ui-frameworks/antd/components/buttons/delete-button/#api-reference) pass metaData={deleteType:'archive'} in DeleteButton

- To get list of rows from collection without status field pass params noStatus=true in meta.

- To upload file to a specific folder add folder="folder_id" in MediaConfigList

## Change Log
#### 1.0.29
- Updated library version to directus sdk v12.
- Added support for folders and title in file upload.
- Added support for collections without status field.

#### 1.0.23
- Fixed missing total count in list.

#### 1.0.22
- update library version to directus sdk v11
- update refine version to v4
- added support for liveprovider using directus realtime api


