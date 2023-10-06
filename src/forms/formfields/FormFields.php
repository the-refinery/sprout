<?php

namespace BarrelStrength\Sprout\forms\formfields;

use BarrelStrength\Sprout\forms\components\elements\FormElement;
use BarrelStrength\Sprout\forms\components\formfields\AddressFormField;
use BarrelStrength\Sprout\forms\components\formfields\CategoriesFormField;
use BarrelStrength\Sprout\forms\components\formfields\CheckboxesFormField;
use BarrelStrength\Sprout\forms\components\formfields\CustomHtmlFormField;
use BarrelStrength\Sprout\forms\components\formfields\DateFormField;
use BarrelStrength\Sprout\forms\components\formfields\DropdownFormField;
use BarrelStrength\Sprout\forms\components\formfields\EmailDropdownFormField;
use BarrelStrength\Sprout\forms\components\formfields\EmailFormField;
use BarrelStrength\Sprout\forms\components\formfields\EntriesFormField;
use BarrelStrength\Sprout\forms\components\formfields\FileUploadFormField;
use BarrelStrength\Sprout\forms\components\formfields\GenderFormField;
use BarrelStrength\Sprout\forms\components\formfields\HiddenFormField;
use BarrelStrength\Sprout\forms\components\formfields\InvisibleFormField;
use BarrelStrength\Sprout\forms\components\formfields\MultipleChoiceFormField;
use BarrelStrength\Sprout\forms\components\formfields\MultiSelectFormField;
use BarrelStrength\Sprout\forms\components\formfields\NameFormField;
use BarrelStrength\Sprout\forms\components\formfields\NumberFormField;
use BarrelStrength\Sprout\forms\components\formfields\OptInFormField;
use BarrelStrength\Sprout\forms\components\formfields\ParagraphFormField;
use BarrelStrength\Sprout\forms\components\formfields\PhoneFormField;
use BarrelStrength\Sprout\forms\components\formfields\PrivateNotesFormField;
use BarrelStrength\Sprout\forms\components\formfields\RegularExpressionFormField;
use BarrelStrength\Sprout\forms\components\formfields\SectionHeadingFormField;
use BarrelStrength\Sprout\forms\components\formfields\SingleLineFormField;
use BarrelStrength\Sprout\forms\components\formfields\TagsFormField;
use BarrelStrength\Sprout\forms\components\formfields\UrlFormField;
use BarrelStrength\Sprout\forms\components\formfields\UsersFormField;
use BarrelStrength\Sprout\forms\forms\GroupLabel;
use BarrelStrength\Sprout\forms\FormsModule;
use Craft;
use craft\base\ElementInterface;
use craft\base\Field;
use craft\base\FieldInterface;
use craft\db\Query;
use craft\db\Table;
use craft\errors\ElementNotFoundException;
use craft\events\RegisterComponentTypesEvent;
use craft\fieldlayoutelements\CustomField;
use craft\helpers\ArrayHelper;
use craft\helpers\StringHelper;
use craft\models\FieldLayout;
use craft\models\FieldLayoutTab;
use craft\records\Field as FieldRecord;
use craft\records\FieldLayoutField as FieldLayoutFieldRecord;
use craft\records\FieldLayoutTab as FieldLayoutTabRecord;
use yii\base\Component;
use yii\base\Exception;

/**
 * @property mixed $defaultTabName
 * @property array $registeredFieldsByGroup
 */
class FormFields extends Component
{
    public const EVENT_REGISTER_FORM_FIELDS = 'registerSproutFormFields';

    /**
     * @var FormFieldTrait[]
     */
    protected ?array $_formFields = null;

    public function getFormFieldTypes(): array
    {
        if ($this->_formFields) {
            return $this->_formFields;
        }

        $formFields = FormsModule::getInstance()->formFields->getDefaultFormFieldTypes();

        $event = new RegisterComponentTypesEvent([
            'types' => $formFields,
        ]);

        $this->trigger(self::EVENT_REGISTER_FORM_FIELDS, $event);

        /** @var FormFieldTrait $instance */
        foreach ($event->types as $type) {
            $this->_formFields[$type] = $type;
        }

        return $this->_formFields;
    }

    /**
     * This service allows duplicate fields from Layout
     */
    public function getDuplicateLayout(FormElement $form, FieldLayout $postFieldLayout): ?FieldLayout
    {
        if (!$form || !$postFieldLayout) {
            return null;
        }

        $oldTabs = $postFieldLayout->getTabs();
        $tabs = [];
        $fields = [];

        foreach ($oldTabs as $oldTab) {
            /** @var Field[] $fieldLayoutFields */
            $fieldLayoutFields = $oldTab->getFields();
            $tabFields = [];

            foreach ($fieldLayoutFields as $fieldLayoutField) {

                /** @var Field $field */
                $field = Craft::$app->getFields()->createField([
                    'type' => $fieldLayoutField::class,
                    'name' => $fieldLayoutField->name,
                    'handle' => $fieldLayoutField->handle,
                    'instructions' => $fieldLayoutField->instructions,
                    'required' => $fieldLayoutField->required,
                    'settings' => $fieldLayoutField->getSettings(),
                ]);

                Craft::$app->content->fieldContext = $form->getFieldContext();
                Craft::$app->content->contentTable = $form->getContentTable();

                // Save duplicate field
                Craft::$app->fields->saveField($field);

                $fields[] = $field;
                $tabFields[] = $field;
            }

            $newTab = new FieldLayoutTab();
            $newTab->name = urldecode($oldTab->name);
            $newTab->sortOrder = 0;
            $newTab->setFields($tabFields);

            $tabs[] = $newTab;
        }

        $fieldLayout = new FieldLayout();
        $fieldLayout->type = FormElement::class;
        $fieldLayout->setTabs($tabs);
        $fieldLayout->setFields($fields);

        return $fieldLayout;
    }

    public function getDefaultFormFieldTypes(): array
    {
        $fields = [];
        $fieldsByGroup = $this->getDefaultFormFieldTypesByGroup();
        foreach ($fieldsByGroup as $group) {
            foreach ($group as $type) {
                $fields[] = $type;
            }
        }

        return $fields;
    }

    public function getDefaultFormFieldTypesByGroup(): array
    {
        $formFieldTypes = [
            SingleLineFormField::class,
            ParagraphFormField::class,
            MultipleChoiceFormField::class,
            DropdownFormField::class,
            CheckboxesFormField::class,
            MultiSelectFormField::class,
            FileUploadFormField::class,
            DateFormField::class,
            NumberFormField::class,
            RegularExpressionFormField::class,
            HiddenFormField::class,
            InvisibleFormField::class,

            NameFormField::class,
            AddressFormField::class,
            EmailFormField::class,
            EmailDropdownFormField::class,
            UrlFormField::class,
            PhoneFormField::class,
            OptInFormField::class,
            GenderFormField::class,

            CategoriesFormField::class,
            EntriesFormField::class,
            TagsFormField::class,
            UsersFormField::class,

            SectionHeadingFormField::class,
            CustomHtmlFormField::class,
            PrivateNotesFormField::class,
        ];

        return ArrayHelper::index($formFieldTypes, null, static function($type) {
            return $type::getGroupLabel();
        });
    }

    public function getCustomFields($registeredFields, $sproutFormsFields)
    {
        foreach ($sproutFormsFields as $group) {
            foreach ($group as $field) {
                unset($registeredFields[$field]);
            }
        }

        return $registeredFields;
    }

    public function getDefaultTabName(): string
    {
        return Craft::t('sprout-module-forms', 'Page 1');
    }

    /**
     * Loads the sprout modal field via ajax.
     */
    public function getModalFieldTemplate(FormElement $form, $field = null, $tabUid = null): array
    {
        $fieldsService = Craft::$app->getFields();
        $request = Craft::$app->getRequest();

        $data = [];
        $data['tabUid'] = null;
        $data['field'] = $fieldsService->createField(SingleLineFormField::class);

        if ($field !== null) {
            $data['field'] = $field;
            $tabUidByPost = $request->getBodyParam('tabUid');

            if ($tabUidByPost !== null) {
                $data['tabUid'] = $tabUidByPost;
            } elseif ($tabUid !== null) {
                //edit field
                $data['tabUid'] = $tabUid;
            }

            if ($field->id != null) {
                $data['fieldId'] = $field->id;
            }
        }

        $data['sections'] = $form->getFieldLayout()->getTabs();
        $data['form'] = $form;
        $data['fieldClass'] = $data['field']::class ?? null;
        $view = Craft::$app->getView();

        $html = $view->renderTemplate('sprout-module-forms/forms/_editFieldModal', $data);
        $js = $view->getBodyHtml();
        $css = $view->getHeadHtml();

        return [
            'html' => $html,
            'js' => $js,
            'css' => $css,
        ];
    }
}
