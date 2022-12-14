import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Model from '@ckeditor/ckeditor5-ui/src/model';

import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

export const ANCLAS_WITH_AT = [
    '@fotoW',
    '@fotoI@',
    '@fotoS@',
    '@fotoD@',
    '@fotoL@',
    '@fotoGaleria@',
    '@videoW@',
    '@CJS@',
    '@CJS2@',
    '@CJS3@',
    '@CJS3@',
    '@audio@',
    '@videoHD@',
    '@cajaRelacionadas@',
    '@miniNota@',
]

export const ANCLAS_WITH_PARENTESIS = [
    '(FW)texto(A)autor(A)(FW)',
    '(FL)texto(A)autor(A)(FL)',
    '(L)nro|texto(L)',
    '(P)autor|texto(P)',
    '(R)autor|texto(R)',
    '(S)subtitulo(S)',
    '(TR)texto resaltado(TR)',
    '(PER1)texto(PER1)',
    '(PER2)texto(PER2)',
    '(TITCP)texto(TITCP)',
    '(CALAT)texto(CALAT)',
    '(CALAING)texto(CALAING)',
    '(CALAPR)texto(CALAPR)',

];


export const ANCLAS = [...ANCLAS_WITH_AT, ...ANCLAS_WITH_PARENTESIS]

export default class Ancla extends Plugin {

    static get pluginName() {
        return 'Ancla';
    }

    init() {
        const editor = this.editor;
        const t = editor.t;
        const defaultTitle = t('Add ancla');
        const dropdownTooltip = t('Ancla');


        // Register UI component
        editor.ui.componentFactory.add('ancla', locale => {

            const dropdownView = createDropdown(locale);

            dropdownView.set({
                label: 'Ancla',
                tooltip: true
            });
            dropdownView.buttonView.set({
                label: 'Ancla',
                withText: true,
                tooltip: dropdownTooltip
            });
            dropdownView.extendTemplate({
                attributes: {
                    class: [
                        'ck-image-dropdown'
                    ]
                }
            });


            // The collection of the list items.
            const items = new Collection();

            ANCLAS.forEach(ancla => {

                items.add({
                    type: 'button',
                    model: new Model({
                        id: ancla,
                        label: ancla,
                        withText: true

                    }),
                });
            })


            // Create a dropdown with a list inside the panel.
            addListToDropdown(dropdownView, items);

            dropdownView.on('execute', (eventInfo) => {
                const { id, label } = eventInfo.source;

                editor.model.change(writer => {

                    //Insert the text at the user's current position
                    editor.model.insertContent(writer.createText(label));

                });
                console.log({ id, label })
            });

            return dropdownView;
        });
    }
}


