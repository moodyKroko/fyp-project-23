package com.projlearn.backend.shell;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Path;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CompileCodeProcess {
  private static final Logger logger = LoggerFactory.getLogger(CompileCodeProcess.class);
  private static Path JLOX_CLASS = Path.of("commandline/fyp-interpreter.jar");
  private static Path OUT_FILE_DIR = Path.of("commandline/output");
  private static Path IN_FILE_DIR = Path.of("commandline/input");
  private static File tempOutFile;

  public static String compileAndRunJLox(String fileName, String title) throws IOException {
    Path filePath = Path.of(IN_FILE_DIR.toString(), fileName);

    tempOutFile = File.createTempFile(title, ".txt", OUT_FILE_DIR.toFile());
    logger.info("File created with name: {}", title);

    // execute the okaejlox interpreter
    logger.info("Command executing");
    String command = String.format("java -jar %s %s", JLOX_CLASS, filePath);
    Process process = Runtime.getRuntime().exec(command);

    try {
      forwardBothStream(process.getInputStream(), process.getErrorStream());
    } catch (IOException e) {
      logger.debug(e.getMessage());
    } finally {
      tempOutFile.deleteOnExit();
    }

    return tempOutFile.getName();
  }

  // connect both input and error stream so both results will be sent
  private static void forwardBothStream(InputStream in, InputStream error) throws IOException {
    boolean inFinished = false;
    boolean errFinished = false;

    logger.info("Begin reading stream loop");
    try (BufferedReader inReader = new BufferedReader(new InputStreamReader(in));
        BufferedReader errReader = new BufferedReader(new InputStreamReader(error));
        BufferedWriter writer = new BufferedWriter(new FileWriter(tempOutFile))) {

      if (!inFinished) {
        writeToFile(inReader, writer);
        inFinished = true;
      }

      if (!errFinished) {
        writeToFile(errReader, writer);
        inFinished = true;
      }

      logger.info("Finished writing to file");
      logger.info("End stream loop.");
    } catch (IOException e) {
      logger.error(e.getMessage());
    }
  }

  private static void writeToFile(BufferedReader reader, BufferedWriter writer) throws IOException {
    String line;
    while ((line = reader.readLine()) != null) {
      writer.write(line + "\n");
    }
  }
}
