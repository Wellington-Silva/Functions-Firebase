class TransformationService {
    /**
     * Transforma um timestamp do firebase em data compatível com JS: new Date
    */
    parseTimestampToDate(timestamp) {
        if (!timestamp)
            return new Date();
        const seconds = Number(timestamp?.seconds || timestamp?._seconds);
        const nanoseconds = Number(timestamp?.nanoseconds || timestamp?._nanoseconds);
        return new Date(seconds * 1000 + (nanoseconds > 0 ? nanoseconds / 1000000 : 0));
    };

    /**
     * Monta os dados em json
     * @param { object } dataObj
     * @returns { object }
    */
    parseObjectToTableJSON(obj, prefix = "", res = {}) {
        prefix = prefix.replace(/-/g, "_").replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();

        if (Array.isArray(obj))
            obj.forEach((item, i) => this.parseObjectToTableJSON(item, `${prefix}_${i}`, res));
        else if ((obj?._seconds || obj?.seconds) && (obj?._nanoseconds || obj?.nanoseconds))
            return res[prefix] = this.parseTimestampToDate(obj); // Transformando obj do tipo timestamp em Dataa
        else if (typeof obj === "object" && obj !== null) {
            for (const key in obj) {
                const value = obj[key];
                const newKey = prefix ? `${prefix}_${key}` : key;
                this.parseObjectToTableJSON(value, newKey, res);
            }
        } else
            res[prefix] = obj;
        return res;
    }

    /**
     * Função HTTP que recebe e processa o payload de mudanças e ie retorna.
     * @param { object } req Objeto de requisição HTTP.
     * @param {object} res Objeto de resposta HTTP.
     */
    async processData(req, res) {
        try {
            const data = req.body.data;

            if (!data || !Array.isArray(data)) {
                console.error("Payload de dados inválido:", req.body);
                return res.status(400).send("Payload de dados inválido.");
            };

            const serializedMountedData = data.map(dt => {
                const tempDataJson = JSON.parse(dt.json.data);
                delete dt.json.data;

                return {
                    ...dt,
                    json: {
                        ...dt.json,
                        ...this.parseObjectToTableJSON(tempDataJson),
                    }
                };

            });

            console.log(serializedMountedData);

            // const responseObject = data.map(payload => ({ ...payload, json: { ...payload.json, ...this.#mountData(payload.json.data) } }));
            return res.status(200).json({ data: serializedMountedData });
        } catch (error) {
            console.error("Erro ao processar e inserir dados no BigQuery:", error);
            res.status(500).json({ error: true, message: `Erro ao processar dados: ${error.message}` });
        }
    };
}

export default new TransformationService();