class TransformationService {
    
    /**
     * Monta os dados em json
     * @param { string } dataStr
     * @returns { object }
    */
    #mountData(dataStr){
        console.log("Internal Data :", dataStr);
        // const dataObj = JSON.parse(data);
        
        // const columnsFather = Object.keys(dataObj);
        // let tempKey = null;
        
        // for (let i = 0; i < columnsFather.length; i++) {
        //     const key = columnsFather[i];
        //     console.log(key);
        //     // if(tempKey)
        //     //     tempKey += "."+key;
        //     // const value = dataObj[]
        //     // if(typeof value === "object")

        // }
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
                console.error('Payload de dados inválido:', req.body);
                return res.status(400).send('Payload de dados inválido.');
            };

            console.log(data[0].json, this.#mountData(data[0].json))
            
            // const responseObject = data.map(payload => ({ ...payload, json: { ...payload.json, ...this.#mountData(payload.json.data) } }));
            return res.status(200).json({ message: "Resposta" });

            // res.status(200).json(responseObject);

        } catch (error) {
            console.error('Erro ao processar e inserir dados no BigQuery:', error);
            res.status(500).json({ error: true, message: `Erro ao processar dados: ${error.message}` });
        }
    };
}

export default new TransformationService();