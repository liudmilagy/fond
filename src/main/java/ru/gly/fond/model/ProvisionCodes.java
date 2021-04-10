package ru.gly.fond.model;

public enum ProvisionCodes {
    WITH_DEPOSIT("with_deposit"),
    WITHOUT_DEPOSIT("without_deposit");

    private final String value;
    private ProvisionCodes(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
