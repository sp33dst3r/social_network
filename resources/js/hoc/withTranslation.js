import React from 'react';

import TranslationConsumer from '../with-translation/with-translation'

const withTranslation = () => (Wrapped) => {
    return (props) => {

        return (
            <TranslationConsumer>
                {
                    (translator) => {
                       return <Wrapped { ...props } translator={translator} />
                    }
                }


            </TranslationConsumer>
        )
    }
}

export default withTranslation;
