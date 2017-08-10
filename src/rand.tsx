export const renderTree = (root: {}, meta: TreeMeta[]) => {
    const data: {}[] = [];

    meta.map((tm: TreeMeta, ind: number) => (ind === 0)
        ? renderTreeLevel(root[tm.arrayField], tm)
        : renderTreeLevel(root[0][tm.arrayField], tm));
};