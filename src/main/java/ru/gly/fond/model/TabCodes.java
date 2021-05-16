package ru.gly.fond.model;

public enum TabCodes {
    ABOUT_FOND("ABOUT_FOND"),
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
