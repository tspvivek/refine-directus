import { GetListResponse, useDataProvider } from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
    Avatar,
} from "@pankod/refine-antd";
import type { IResourceComponentsProps } from "@pankod/refine-core";
import { IPost } from "../../interfaces";

export const PostList: React.FC<
    IResourceComponentsProps<GetListResponse<IPost>>
> = ({ initialData }) => {

    const dataProvider = useDataProvider();

    const { tableProps } = useTable<IPost>({
        syncWithLocation: false
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="image" title="Image"
                    align="center"
                    render={(data) => (
                        data ?
                            <Avatar
                                src={dataProvider().getApiUrl() + "assets/" + data}
                                alt="Image"
                                size={64}
                            /> : <Avatar size={64} />
                    )} />
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="status" title="Status" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_text, record): React.ReactNode => {
                        return (
                            <Space>
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <DeleteButton
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};
