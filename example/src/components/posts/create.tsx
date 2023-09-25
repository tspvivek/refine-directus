import { useForm, useSelect, Create } from "@refinedev/antd";
import { Form, Select, Input, Upload } from "antd";
import { useApiUrl } from "@refinedev/core";
import { directusClient } from "src/directusClient";
import { ICategory, IPost } from "src/interfaces";
import { getValueProps, MediaConfig, mediaUploadMapper, useDirectusUpload } from "@tspvivek/refine-directus";

export const PostCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();
    const apiUrl = useApiUrl();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: "name",
        optionValue: "id",

        pagination: {
            mode: "server",
        },
    });

    //List of media field and their config
    const mediaConfigList: MediaConfig[] = [
        { name: "image", multiple: false, maxCount: 1, folder: "017b8c4c-48c0-4f5a-88af-98d36cd620fd", title: "PostImage" },
        { name: "gallery", multiple: true, maxCount: 5, normalize: (id) => ({ directus_files_id: id }) },
    ];

    const getUploadProps = useDirectusUpload(mediaConfigList, directusClient);

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    return formProps.onFinish && formProps.onFinish(mediaUploadMapper(values, mediaConfigList));
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
                        getValueProps={(data) =>
                            getValueProps({
                                data,
                                imageUrl: apiUrl,
                            })
                        }
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            onChange={(info) => {
                                return info;
                            }}
                            {...getUploadProps("image")}
                        >
                            <p className="ant-upload-text">Drag & drop a file in this area</p>
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
                                getFileUrl: (item) => {
                                    return apiUrl + "assets/" + item.directus_files_id.id;
                                },
                                getFileTitle: (item) => {
                                    return item.directus_files_id.title;
                                },
                            });
                        }}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            onChange={(info) => {
                                return info;
                            }}
                            {...getUploadProps("gallery")}
                        >
                            <p className="ant-upload-text">Drag & drop a file in this area</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
    );
};
