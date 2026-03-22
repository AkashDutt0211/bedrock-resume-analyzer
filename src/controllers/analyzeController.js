import { extractText } from "../utils/pdfParser.js";
import { analyzeResume } from "../services/resumeAnalyzer.js";

export async function analyzeResumeController(req, res) {

try {

const filePath = req.file.path;

const resumeText = await extractText(filePath);

const analysis = await analyzeResume(resumeText);

res.json({
 analysis
});

} catch (error) {

console.error(error);

res.status(500).json({
 error: "Resume analysis failed"
});

}

}