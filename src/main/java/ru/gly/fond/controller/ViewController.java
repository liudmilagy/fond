package ru.gly.fond.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.gly.fond.model.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@Slf4j
public class ViewController extends SuperController {

    @GetMapping("/about_fond")
    public String viewAboutFond(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "about_fond_view";
    }

    @GetMapping("/about_fond_info")
    public @ResponseBody
    String getAboutFondHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.ABOUT_FOND.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/about_fond_files")
    public @ResponseBody
    List<RegTabFile> getAboutFondFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.ABOUT_FOND.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }

    @GetMapping("/normative_documents")
    public String viewNormativeDocs(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "normative_docs_view";
    }

    @GetMapping("/normative_docs_info")
    public @ResponseBody
    String getNormativeDocsHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.NORMATIVE_DOCS.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/normative_docs_files")
    public @ResponseBody
    List<RegTabFile> getNormativeDocsFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.NORMATIVE_DOCS.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }

    @GetMapping("/contacts")
    public String viewContacts(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "contacts_view";
    }

    @GetMapping("/contacts_info")
    public @ResponseBody
    String getContactsHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.CONTACTS.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/contacts_files")
    public @ResponseBody
    List<RegTabFile> getContactsFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.CONTACTS.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }

    @GetMapping("/calculator")
    public String viewCalculator(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "calculator_view";
    }

    @GetMapping("/about_anti_corruption")
    public String viewAboutAntiCorruption(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "anti_corruption_view";
    }

    @GetMapping("/about_anti_corruption_info")
    public @ResponseBody
    String getAboutAntiCorruptionHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.ANTI_CORRUPTION.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/about_anti_corruption_files")
    public @ResponseBody
    List<RegTabFile> getAboutAntiCorruptionFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.ANTI_CORRUPTION.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }

    @GetMapping("/information_disclosure")
    public String viewInformationDisclosure(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "information_disclosure_view";
    }

    @GetMapping("/information_disclosure_info")
    public @ResponseBody
    String getInformationDisclosurenHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.INFO_DISCLOSURE.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/information_disclosure_files")
    public @ResponseBody
    List<RegTabFile> getInformationDisclosureFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.INFO_DISCLOSURE.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }

    @GetMapping("/terms_of_providing_microloans")
    public String viewTermsOfProvidingMicroloans(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "terms_of_providing_microloans_view";
    }

    @GetMapping("/terms_of_providing_microloans_info")
    public @ResponseBody
    String getTermsOfProvidingMicroloansHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.TERMS_OF_PROVIDING_MICROLOANS.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/terms_of_providing_microloans_files")
    public @ResponseBody
    List<RegTabFile> getTermsOfProvidingMicroloansFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.TERMS_OF_PROVIDING_MICROLOANS.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }


    @GetMapping("/documents")
    public String viewDocuments(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "documents_view";
    }

    @GetMapping("/documents_info")
    public @ResponseBody
    String getDocumentsHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.DOCUMENTS.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/documents_files")
    public @ResponseBody
    List<RegTabFile> getDocumentsFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.DOCUMENTS.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }


    @GetMapping("/requisites")
    public String viewRequisites(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "requisites_view";
    }

    @GetMapping("/requisites_info")
    public @ResponseBody
    String getRequisitesHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.REQUISITES.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/requisites_files")
    public @ResponseBody
    List<RegTabFile> getRequisitesFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.REQUISITES.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }

    @GetMapping("/documents_IP")
    public String viewDocumentsIP(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "documents_ip_view";
    }

    @GetMapping("/documents_IP_info")
    public @ResponseBody
    String getDocumentsIPHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.DOCUMENTS_IP.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/documents_IP_files")
    public @ResponseBody
    List<RegTabFile> getDocumentsIPFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.DOCUMENTS_IP.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }

    @GetMapping("/documents_UL")
    public String viewDocumentsUL(Model model, HttpSession session) {
        model.addAttribute("application_name", applicationConstants.getApplicationName());

        return "documents_ul_view";
    }

    @GetMapping("/documents_UL_info")
    public @ResponseBody
    String getDocumentsULHTML() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.DOCUMENTS_UL.getValue());
        return tab.getHtmlText();
    }

    @GetMapping("/documents_UL_files")
    public @ResponseBody
    List<RegTabFile> getDocumentsULFiles() {
        ClsTab tab = clsTabRepo.findByCode(TabCodes.DOCUMENTS_UL.getValue());
        List<RegTabFile> tabFiles = regTabFileRepo.findRegTabFileByTab_IdAndIsDeleted(tab.getId(), false);
        return tabFiles;
    }
}
