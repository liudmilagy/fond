package ru.gly.fond.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.SocketException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.net.InetSocketAddress;
import java.net.Proxy;

import java.util.ArrayList;
import java.util.Calendar;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

/**
 * @author websms.ru
 * @version 1.1
 *
 * Класс, позволяющий отправлять СМС сообщения через сервер websms.ru
 * и контролировать состояние ранее отправленных сообщений
 */

public class HttpSmsSender {
    static String URL_SEND = "http://cab.websms.ru/http_in6.asp";
    static String URL_STATUS = "http://cab.websms.ru/http_out5.asp";
    static byte[] byte10 = {(byte)10};
    // static int repeats = 2;
    // static boolean debug = false;
    // static boolean showStructure = false;
    // static boolean showMessage = false;
    // static int attnum = 1;
    // static int msgSize = 10240000;
    private int connectionTimeOut = 10000;
    private String user = null;
    private String password = null;
    private boolean isProxy = false;
    private String proxyHost = null;
    private int proxyPort = 0;
    private String lastError = "0";
    private ArrayList<OneMessage> oneMessage;

    /**
     * Конструктор - создает новый объект для отправки сообщений
     * и задает имя пользователя и пароль для авторизации на сервере
     * @param user - имя пользователя
     * @param password - пароль
     */
    public HttpSmsSender(String user, String password) {
        this.user = user;
        this.password = password;
        oneMessage = new ArrayList<OneMessage>();

    }

    /**
     * Метод включает режим работы через прокси и задает параметры прокси
     * @param proxyHost
     * @param proxyPort
     */
    public void setProxy(String proxyHost, int proxyPort) {
        if((!proxyHost.equals(""))&&(proxyPort != 0)) {
            this.proxyHost = proxyHost;
            this.proxyPort = proxyPort;
            isProxy = true;
        } else {
            isProxy = false;
        }
    }

    /**
     * Метод задает величину таймаута в миллисекундах для соединения с сервером websms
     * По умолчанию устанавливается значение в 10000 миллисекунд
     * @param timeOut
     */
    public void setTimeOut(int timeOut) {
        connectionTimeOut = timeOut;
    }

    /**
     * Метод отправки сообщения на один или несколько номеров (через запятую)
     * @param toPhone - адресат или несколько адресатов - через запятую
     * @param messText - текст сообщения
     * @return - возвращает код ошибки, возникшей при отправке, или 0 (успешная отправка)
     */
    public int send(String toPhone, String messText){
        return send(toPhone, messText, "", 0, false, false);
    }

    /**
     * Метод отправки сообщения на один или несколько номеров (через запятую)
     * @param toPhone - адресат или несколько адресатов - через запятую
     * @param messText - текст сообщения
     * @param fromPhone - имя отправителя, если необходимо его задать при отправке
     * @param msgId - пользовательский id сообщения
     * @param isViber - если параметр имеет значение true, то сообщения отправляются на Viber
     * @param isTest - проверка возможности приема сообщения сервером без реальной отправки получателю
     * @return - возвращает код ошибки, возникшей при отправке, или 0 (успешная отправка)
     */
    public int send(String toPhone, String messText, String fromPhone, int msgId, boolean isViber, boolean isTest){
        int responseCode = -1;
        int errorCode = -1;
        String result = null;
        String sendDate = "";
        HttpURLConnection connection = null;

        lastError = "-1";
        oneMessage.clear();
        fromPhone = fromPhone.trim();
        toPhone = toPhone.replace('+', ' ').replaceAll("\\s+","");
        messText = messText.trim().replaceAll("\\n", new String(byte10));
        if (toPhone.equals("")) {
            return 12;
        }
        if (!messText.equals("")) {
            try {
                StringBuffer strParams = new StringBuffer("http_username=").append(user).append("&http_password=").append(password).append("&Phone_list=").append(toPhone).append("&Message=").append(java.net.URLEncoder.encode(messText,"UTF-8")).append("&format=XML");
                if(!fromPhone.equals("")) {
                    strParams.append("&fromPhone=").append(java.net.URLEncoder.encode(fromPhone,"UTF-8"));
                }
                if(msgId>0) {
                    strParams.append("&message_id=").append(Integer.toString(msgId));
                }
                if(isViber) {
                    strParams.append("&mode=VIBER");
                }
                if(isTest) {
                    strParams.append("&test=1");
                }
                URL url = new URL(URL_SEND);
                if (isProxy) {
                    connection = (HttpURLConnection)url.openConnection(new Proxy(java.net.Proxy.Type.HTTP, new InetSocketAddress(proxyHost, proxyPort)));
                } else {
                    connection = (HttpURLConnection) url.openConnection();
                }
                connection.setDoInput(true);
                connection.setDoOutput(true);
                connection.setConnectTimeout(connectionTimeOut);
                connection.setReadTimeout(connectionTimeOut);
                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
                connection.setRequestProperty("Pragma", "no-cache");
                // connection.setInstanceFollowRedirects(false);
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Length", Integer.toString(strParams.length()));
                try {
                    connection.connect();
                    // отправляем параметры
                    PrintWriter out = new PrintWriter(connection.getOutputStream());
                    out.write(strParams.toString());
                    out.flush();
                    // получаем код ошибки или 200
                    responseCode = connection.getResponseCode();
                } catch (SocketException e3) {
                    errorCode = -300;
                }
                // если все нормально, получаем текст ответа в InputStream
                if (responseCode==200) {
                    result = InputStream2String(connection.getInputStream());
                    sendDate = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
                } else {
                    errorCode = -responseCode;
                }
                connection.disconnect();
            } catch (MalformedURLException e) {
                errorCode = -10;
            } catch (IOException e) {
                errorCode = -100;
            }

            if (result != null) {
                errorCode = -200;
                Document doc = null;
                NodeList nodes = null;
                try {
                    doc = loadXMLFromString(result);
                    nodes = doc.getElementsByTagName("XML");
                } catch (Exception e) {
                    errorCode = -200;
                }
                if ((doc != null)&&(nodes != null)) {
                    NodeList httpinNodes = nodes.item(0).getChildNodes();
                    Node node = httpinNodes.item(0);
                    String nname = node.getNodeName();
                    if (nname.equalsIgnoreCase("httpIn")) {
                        if (node.hasAttributes()) {
                            NamedNodeMap attrs = node.getAttributes();
                            if (attrs != null) {
                                Node errNode = attrs.getNamedItem("error_num");
                                if(errNode != null) {
                                    lastError = errNode.getNodeValue();
                                    try {
                                        errorCode = Integer.parseInt(lastError);
                                    } catch(NumberFormatException nfe) {
                                        errorCode = -1;
                                    }
                                }
                            }
                        }

                        if("0".equals(lastError)) {
                            errorCode = 0;
                            //NodeList smsNodes = nodes.item(0).getChildNodes();
                            NodeList smsNodes = node.getChildNodes();
                            for (int i = 0; i < smsNodes.getLength(); i++) {
                                Node sNode = smsNodes.item(i);
                                nname = sNode.getNodeName();
                                if (nname.equalsIgnoreCase("SMS")) {
                                    if (sNode.hasAttributes()) {
                                        NamedNodeMap attrs = sNode.getAttributes();
                                        if (attrs != null) {
                                            Node idNode = attrs.getNamedItem("message_id");
                                            if(idNode != null) {
                                                String id = idNode.getNodeValue();
                                                Node phoneNode = attrs.getNamedItem("message_phone");
                                                String phone = phoneNode.getNodeValue();
                                                Node partNode = attrs.getNamedItem("message_parts");
                                                String parts = partNode.getNodeValue();
                                                OneMessage lm = new OneMessage();
                                                lm.id = id;
                                                lm.phone = phone;
                                                lm.parts = parts;
                                                lm.sendDate = sendDate;
                                                oneMessage.add(lm);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }else {
                errorCode = -200;
            }
        } else {
            errorCode = 11;
        }
        return errorCode;
    }

    /**
     * Метод возвращает результат отправки последнего сообщения в виде {id, phone, parts, sendDate}
     * где id - уникальный id сообщения, присваиваемый сервером, который можно
     * использовать в дальнейшем для контроля состояния ранее отправленных сообщений
     * @return  - {id, phone, parts, sendDate}
     */
    public String[] getLastMessage() {
        String[] ret = null;
        if (!oneMessage.isEmpty()) ret = oneMessage.get(oneMessage.size()-1).getMessage();
        return ret;
    }

    /**
     * Метод возвращает уникальный id сообщения, присваиваемый сервером, который можно
     * использовать в дальнейшем для контроля состояния ранее отправленных сообщений
     * @return  - id
     */
    public String getLastMessageId() {
        String ret = null;
        if (!oneMessage.isEmpty()) ret = oneMessage.get(oneMessage.size()-1).id;
        return ret;
    }

    /**
     * Метод возвращает массив id - уникальных идентификаторов последних сообщений
     * @return  - массив id
     */
    public Object[] getMessIds() {
        ArrayList<String> messList = new ArrayList<String>();
        for(OneMessage mess : oneMessage) {
            messList.add(mess.id);
        }
        return messList.toArray();
    }

    /**
     * Метод возвращает код ошибки, возвращенной сервером при последнем выполнении метода send()
     * при успешной отправке содержит 0
     * @return - код ошибки
     */
    public String getLastError() {
        return lastError;
    }

    /**
     * Метод, запрашивающий состояние ранее отправленного сообщения по ID сообщения
     * расшифровка возвращаемых значений - http://websms.ru/content/doc/HTTP_HTTPSsendmethod_v1.9.1.pdf стр.13
     * основные значения: 4 - передано оператору, 5 - не принято, 6 - доставлено адресату, 7 - недоставляемо
     * @param id - уникальный ID ранее отправленного сообщения (возвращается сервером, если сообщение принято),
     * можно получить, используя метод getLastMessageId() или getMessIds()
     * @return - состояние сообщения с указанным ID; возвращает -1, если состояние не удалось получить
     */
    public int getStatus(String id) {
        HttpURLConnection connection = null;
        int responseCode = -1;
        int status = -1;
        String result = null;

        if (!id.equals("")) {
            try {
                StringBuffer strParams = new StringBuffer("http_username=").append(user).append("&http_password=").append(password).append("&message_id=").append(id).append("&format=XML");
                URL url = new URL(URL_STATUS);
                if (isProxy) {
                    connection = (HttpURLConnection)url.openConnection(new Proxy(java.net.Proxy.Type.HTTP, new InetSocketAddress(proxyHost, proxyPort)));
                } else {
                    connection = (HttpURLConnection) url.openConnection();
                }
                connection.setDoInput(true);
                connection.setDoOutput(true);
                connection.setConnectTimeout(connectionTimeOut);
                connection.setReadTimeout(connectionTimeOut);
                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
                connection.setRequestProperty("Pragma", "no-cache");
                // connection.setInstanceFollowRedirects(false);
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Length", Integer.toString(strParams.length()));
                try {
                    connection.connect();
                    // отправляем параметры
                    PrintWriter out = new PrintWriter(connection.getOutputStream());
                    out.write(strParams.toString());
                    out.flush();
                    // получаем код ошибки или 200
                    responseCode = connection.getResponseCode();
                } catch (SocketException e3) {
                    status = -1;
                }
                // если все нормально, получаем текст ответа в InputStream
                if (responseCode==200) {
                    result = InputStream2String(connection.getInputStream());
                    //sendDate = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
                } else {
                    status = -1;
                }
                connection.disconnect();
            } catch (MalformedURLException e) {
                status = -1;
            } catch (IOException e) {
                status = -1;
            }

            if (result != null) {
                Document doc = null;
                NodeList nodes = null;
                try {
                    doc = loadXMLFromString(result);
                    nodes = doc.getElementsByTagName("XML");
                } catch (Exception e) {
                    status = -1;
                }
                if ((doc != null)&&(nodes != null)) {
                    NodeList httpinNodes = nodes.item(0).getChildNodes();
                    Node node = httpinNodes.item(0);
                    String nname = node.getNodeName();
                    if (nname.equalsIgnoreCase("httpOut")) {
                        NodeList smsNodes = node.getChildNodes();
                        for (int i = 0; i < smsNodes.getLength(); i++) {
                            Node sNode = smsNodes.item(i);
                            nname = sNode.getNodeName();
                            if (nname.equalsIgnoreCase("SMS")) {
                                if (sNode.hasAttributes()) {
                                    NamedNodeMap attrs = sNode.getAttributes();
                                    if (attrs != null) {
                                        Node idNode = attrs.getNamedItem("result_id");
                                        if(idNode != null) {
                                            String result_id = idNode.getNodeValue();
                                            try {
                                                status = Integer.parseInt(result_id);
                                            } catch(NumberFormatException nfe) {
                                                status = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return status;
    }

    /**
     * Метод, запрашивающий состояние последнего отправленного сообщения
     * расшифровка возвращаемых значений - http://websms.ru/content/doc/HTTP_HTTPSsendmethod_v1.9.1.pdf стр.13
     * основные значения: 4 - передано оператору, 5 - не принято, 6 - доставлено адресату, 7 - недоставляемо
     * @return - состояние сообщения; возвращает -1, если состояние не удалось получить
     */
    public int getStatus() {
        int status = -1;
        String id = getLastMessageId();
        if (id != null) status = getStatus(id);
        return status;
    }

    private Document loadXMLFromString(String xml) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        InputSource is = new InputSource(new StringReader(xml));
        return builder.parse(is);
    }

    private String InputStream2String(InputStream is) throws IOException {
        InputStreamReader isr = new InputStreamReader(is);
        int numCharsRead;
        char[] charArray = new char[1024];
        StringBuffer sb = new StringBuffer();
        int kc = 102400;
        while (((numCharsRead = isr.read(charArray)) > 0) && (kc > 0)) {
            sb.append(charArray, 0, numCharsRead);
            kc--;
        }
        return sb.toString();
    }

    private class OneMessage {
        public String id;
        public String phone;
        public String parts;
        public String sendDate;

        public String[] getMessage() {
            String[] ret = {id, phone, parts, sendDate};
            return ret;
        }
    }

}

/*
		// создать объект
		HttpSmsSender ws = new HttpSmsSender("логин-http", "пароль");

		// отправить сообщения
		ws.send("79123456789,79234567891", "Ваша заявка зарегистрирована под №12345", "", 0, false, false);

		// получить код последней ошибки
		System.out.println(ws.getLastError());

		// получить ID сообщения
		System.out.println(ws.getLastMessageId());

		// запросить состояние последнего отправленного сообщения
		System.out.println(ws.getStatus());

		// запросить состояние ранее отправленного сообщения по ID сообщения
		System.out.println(ws.getStatus("530691510"));

*/