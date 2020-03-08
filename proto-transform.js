
module.exports = function(fileInfo, api, options) {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    const LIA_PREFIX = '[LIA> ';
    const LIA_SUFFIX = ']';

    const addLoggingToTSMethods = (path, filepath) => {
        path.find(j.ClassMethod)
            .forEach(p => {
                let methodName = p.node.key.name;
                let methodBlockBody = p.node.body.body;
    
                methodBlockBody.unshift(
                    j.expressionStatement(
                        j.callExpression(
                            j.identifier('console.log'),
                            [ j.literal(`${LIA_PREFIX}${filepath}:${p.node.body.loc.start.line}:${methodName}()${LIA_SUFFIX}`)]
                        )
                    )
                )
        });
    }

    const addLoggingToAnonymousFunctions = (path, filepath) => {
        path.find(j.FunctionExpression)
            .forEach(p => {
                let functionBlockBody = p.node.body.body;

                const paramString = buildAnonymousParamsList(p.node.params)

                functionBlockBody.unshift(
                    j.expressionStatement(
                        j.callExpression(
                            j.identifier('console.log'),
                            [ j.literal(`${LIA_PREFIX}${filepath}:${p.node.body.loc.start.line}:function${paramString}${LIA_SUFFIX}`)]
                        )
                    )
                )
            })
    }

    const addLoggingToArrowFunctions = (path, filepath) => {
        path.find(j.ArrowFunctionExpression)
            .forEach(p => {
                let functionBlockBody = p.node.body.body;

                const paramString = buildAnonymousParamsList(p.node.params)

                functionBlockBody.unshift(
                    j.expressionStatement(
                        j.callExpression(
                            j.identifier('console.log'),
                            [ j.literal(`${LIA_PREFIX}${filepath}:${p.node.body.loc.start.line}:${paramString} => {}${LIA_SUFFIX}`)]
                        )
                    )
                )
            });
    }


    // UTILITY METHODS
    const buildAnonymousParamsList = (paramNodes) => {
        let paramString = "(";

        for (let index = 0; index < paramNodes.length; index++) {
            paramString = paramString + paramNodes[index].name; 

            if (index !== (paramNodes.length - 1)) {
                paramString = paramString + ", ";
            }
        }

        paramString = paramString + ")";
        return paramString;
    }

    addLoggingToTSMethods(root, fileInfo.path);
    addLoggingToArrowFunctions(root, fileInfo.path);
    addLoggingToAnonymousFunctions(root, fileInfo.path)

    return root.toSource();
}
