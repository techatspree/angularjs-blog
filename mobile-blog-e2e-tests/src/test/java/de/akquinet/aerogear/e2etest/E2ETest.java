package de.akquinet.aerogear.e2etest;

import junit.framework.Assert;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;

@RunWith(Arquillian.class)
public class E2ETest {

    @Deployment(testable = false)
    public static WebArchive accessDeployment() {
        File theWar = MavenDependencyResolver.resolve("de.akquinet.aerogear", "mobile-blog-web", "1.0-SNAPSHOT", null, "war");
        return ShrinkWrap.createFromZipFile(WebArchive.class, theWar);
    }

    @Test
    public void runE2ETest() {
        WebDriver driver = new FirefoxDriver();
        driver.get("http://localhost:8180/blog/angular-js/test/e2e/runner.html");

        ExpectedCondition e = new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return !d.findElement(By.id("application")).isDisplayed();
            }
        };
        Wait w = new WebDriverWait(driver, 10);
        w.until(e);

        WebElement errorText   = driver.findElement(By.className("status-error"));
        WebElement failureText = driver.findElement(By.className("status-failure"));
        WebElement successText = driver.findElement(By.className("status-success"));

        System.out.println("\n\n\n------------------------------------------------------------------------");
        System.out.println("AngularJS End-to-End-Tests\n");

        System.out.println(errorText.getText());
        System.out.println(failureText.getText());
        System.out.println(successText.getText());

        System.out.println("------------------------------------------------------------------------\n\n\n");

        Assert.assertEquals(errorText.getText(), "0 Errors");
        Assert.assertEquals(failureText.getText(), "0 Failures");

        driver.close();
    }

}
