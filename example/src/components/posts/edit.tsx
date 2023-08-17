import { useForm, useSelect, Edit } from "@refinedev/antd";
import { RcFile } from "antd/lib/upload/interface";
import { Form, Input, Select, Upload } from "antd";
import { useApiUrl, useDataProvider } from "@refinedev/core";
import { getValueProps, MediaConfig, mediaUploadMapper, useDirectusUpload } from "@tspvivek/refine-directus";
import { directusClient } from "src/directusClient";
import { ICategory, IPost } from "src/interfaces";


export const PostEdit: React.FC = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>({ meta: { fields: ['*', 'image.*', 'gallery.*.*'] } });
    const apiUrl = useApiUrl();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: "name",
        optionValue: "id",

        pagination: {
            mode: "server"
        }
    });

    //List of media field and their config
    const mediaConfigList: MediaConfig[] = [
        { name: "image", multiple: false, maxCount: 1 },
        { name: "gallery", multiple: true, maxCount: 5, normalize: (id) => ({ directus_files_id: id }) },
    ];

    const getUploadProps = useDirectusUpload(mediaConfigList, directusClient);

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical"
                onFinish={(values) => {
                    return (
                        formProps.onFinish &&
                        formProps.onFinish(mediaUploadMapper(values, mediaConfigList))
                    );
                }}
            >
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Category" name={"category"}>
                    <Select {...categorySelectProps} />
                </Form.Item>

                <Form.Item label="Images">
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueProps={(data) => getValueProps({
                            data,
                            imageUrl: apiUrl
                        })}
                        noStyle
                    >

                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            onChange={(info) => { return info }}
                            {...getUploadProps("image")}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>

                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>

                <Form.Item label="Images">
                    <Form.Item
                        name="gallery"
                        valuePropName="fileList"
                        getValueProps={(data) => {
                            return getValueProps({
                                data,
                                imageUrl: apiUrl,
                                getFileUrl: (item) => { return apiUrl + "assets/" + item.directus_files_id.id; },
                                getFileTitle: (item) => { return item.directus_files_id.title; },
                            })
                        }}
                        noStyle
                    >

                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            onChange={(info) => { return info }}
                            {...getUploadProps("gallery")}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>

                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>

            </Form>
        </Edit>
    );
};
