
module.exports = function(fileInfo, api, options) {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    let methodDeclaration = root.find(j.ClassMethod);

    root.find(j.ClassMethod)
        .forEach(p => {
            let methodName = p.node.key.name;
            let methodBlockBody = p.node.body.body;

            methodBlockBody.unshift(
                j.expressionStatement(
                    j.callExpression(
                        j.identifier('console.log'),
                        [ j.literal(`${fileInfo.path}:${methodName}`)]
                    )
                )
            )
    });

    return root.toSource();
}