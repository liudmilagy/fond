package ru.gly.fond.model;

public enum TabCodes {
    ABOUT_FOND("ABOUT_FOND"),
    ANTI_CORRUPTION("ANTI_CORRUPTION"),
    INFO_DISCLOSURE("INFO_DISCLOSURE"),
    TERMS_OF_PROVIDING_MICROLOANS("TERMS_OF_PROVIDING_MICROLOANS"),
    DOCUMENTS("DOCUMENTS"),
    REQUISITES("REQUISITES"),
    NORMATIVE_DOCS("NORMATIVE_DOCS"),
    CONTACTS("CONTACTS");

    private final String value;
    private TabCodes(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
